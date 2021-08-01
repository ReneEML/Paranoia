package com.paranoia.server.controllers;

import com.paranoia.server.controllers.dto.ConnectRequest;
import com.paranoia.server.controllers.dto.ShowRequest;
import com.paranoia.server.controllers.dto.StartRequest;
import com.paranoia.server.exception.InvalidGameException;
import com.paranoia.server.exception.InvalidParamException;
import com.paranoia.server.exception.InvalidPhaseException;
import com.paranoia.server.model.*;
import com.paranoia.server.service.GameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
public class GameController {
    private final Logger logger;
    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public GameController(GameService gameService, SimpMessagingTemplate simpMessagingTemplate) {
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.logger = LoggerFactory.getLogger(GameController.class);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create")
    public ResponseEntity<Game> create(@RequestBody Player player){
        logger.info("Create game request: {}", player);
        return ResponseEntity.ok(gameService.createGame(player));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/connect")
    public ResponseEntity<Game> connect(@RequestBody ConnectRequest connectRequest)
            throws InvalidParamException, InvalidGameException {
        logger.info("Connect to game request: {}", connectRequest);
        Game game = gameService.connectToGame(connectRequest.getPlayer(), connectRequest.getGameId());
        simpMessagingTemplate.convertAndSend("/topic/players/" + game.getGameId(), game);
        return ResponseEntity.ok(game);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/start")
    public void start(@RequestBody StartRequest request) throws InvalidParamException, InvalidGameException {
        logger.info("Starting game: {}", request);
        Game game = gameService.startGame(request.getGameId());
        simpMessagingTemplate.convertAndSend("/topic/start/" +game.getGameId(), game);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/get")
    public ResponseEntity<Game> get(@RequestBody StartRequest request) throws InvalidParamException {
        logger.info("Retrieving game: {}", request);
        return ResponseEntity.ok(gameService.getGameState(request.getGameId()));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @MessageMapping("/ask")
    public void ask(@RequestBody Question request) throws InvalidGameException, InvalidPhaseException {
        logger.info("Ask: {}", request);
        Game game = gameService.askQuestion(request);
        simpMessagingTemplate.convertAndSend("/topic/gameplay/" +game.getGameId(), game);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @MessageMapping("/answer")
    public void answer(@RequestBody Answer request) throws InvalidGameException, InvalidPhaseException {
        logger.info("Answer: {}", request);
        Game game = gameService.answerQuestion(request);
        simpMessagingTemplate.convertAndSend("/topic/gameplay/" + game.getGameId(), game);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @MessageMapping("/show")
    public void show(@RequestBody ShowRequest request) throws InvalidGameException, InvalidPhaseException {
        logger.info("Show: {}", request);
        Game game = gameService.showAnswer(request.getGameId());
        simpMessagingTemplate.convertAndSend("/topic/gameplay/" + game.getGameId(), game);
    }
}
