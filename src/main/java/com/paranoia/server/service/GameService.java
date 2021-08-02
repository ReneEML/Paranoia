package com.paranoia.server.service;

import com.paranoia.server.exception.InvalidGameException;
import com.paranoia.server.exception.InvalidParamException;
import com.paranoia.server.exception.InvalidPhaseException;
import com.paranoia.server.model.*;
import com.paranoia.server.storage.GameStorage;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class GameService {
    public Game createGame(Player player){
        Game game = new Game(player);
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public  Game connectToGame(Player player, String gameId) throws InvalidParamException, InvalidGameException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)){
            throw new InvalidParamException("Game with provKided id:" + gameId + "dosen't exist");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);
        if(game.getStatus() == GameStatus.IN_PROGRESS) {
            throw new InvalidGameException("Game is already started");
        }
        if(game.getStatus() == GameStatus.FINISHED) {
            throw new InvalidGameException("Game is finished");
        }
        if(game.getPlayers().size() >= 15){
            throw new InvalidGameException("Game is full");
        }
        game.addPlayer(player);
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game startGame(String gameId) throws InvalidParamException, InvalidGameException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)) {
            throw new InvalidParamException("Game with provided id:" + gameId + "dosen't exist");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);
        if(game.getPlayers().size() < 2){
            throw new InvalidGameException("Need at least 2 players to start the game");
        }
        game.setStatus(GameStatus.IN_PROGRESS);
        game.setPhase(RoundPhase.ASK);
        game.startRound();
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game getGameState(String gameId) throws InvalidParamException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)){
            throw new InvalidParamException("Game with provided id:" + gameId + "dosen't exist");
        }
        return GameStorage.getInstance().getGames().get(gameId);
    }

    public Game askQuestion(Question question) throws InvalidGameException, InvalidPhaseException {
        if(!GameStorage.getInstance().getGames().containsKey(question.getGameId())) {
            throw new InvalidGameException("Game not found");
        }
        Game game = GameStorage.getInstance().getGames().get(question.getGameId());
        if(!game.getPhase().equals(RoundPhase.ASK)) {
            throw new InvalidPhaseException("Can ask question in ask phase");
        }

        game.setQuestion(question.getQuestion());
        game.setPhase(RoundPhase.ANSWER);

        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game answerQuestion(Answer answer) throws InvalidGameException, InvalidPhaseException {
        if(!GameStorage.getInstance().getGames().containsKey(answer.getGameId())) {
            throw new InvalidGameException("Game not found");
        }
        Game game = GameStorage.getInstance().getGames().get(answer.getGameId());
        if(!game.getPhase().equals(RoundPhase.ANSWER)) {
            throw new InvalidPhaseException("Can only answer in answer phase");
        }

        game.setAnswer(answer.getAnswer());
        game.setPhase(RoundPhase.COINFLIP);

        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game showAnswer(String gameId) throws InvalidGameException, InvalidPhaseException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)) {
            throw new InvalidGameException("Game not found");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);
        if(!game.getPhase().equals(RoundPhase.COINFLIP)) {
            throw new InvalidPhaseException("Can only answer in answer phase");
        }
        game.setShowAnswer(new Random().nextBoolean());
        game.setPhase(RoundPhase.SHOW);

        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game nextRound(String gameId) throws InvalidGameException, InvalidPhaseException {
        if(!GameStorage.getInstance().getGames().containsKey(gameId)) {
            throw new InvalidGameException("Game not found");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);
        if(!game.getPhase().equals(RoundPhase.SHOW)) {
            throw new InvalidPhaseException("Can only go to next round in show phase");
        }
        game.startRound();
        game.setPhase(RoundPhase.ASK);
        GameStorage.getInstance().setGame(game);
        return game;
    }
}
