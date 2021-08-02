package com.paranoia.server.service;

import com.paranoia.server.exception.InvalidGameException;
import com.paranoia.server.exception.InvalidParamException;
import com.paranoia.server.model.*;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GameServiceTest {
    public GameService service = new GameService();
    public Game createAGame(String name) {
        Player player = new Player();
        player.setPlayerName(name);
        return service.createGame(player);
    }
    @Test
    public void testCreateGame() {
        String name = "Rene";
        Game game = createAGame(name);
        assertNull(game.getAnswer());
        assertEquals(game.getPlayers().size(), 1);
        assertEquals(game.getStatus(), GameStatus.NEW);
        assertEquals(game.getPhase(), RoundPhase.ASK);
    }

    @Test
    public void testConnectToGame() throws InvalidParamException, InvalidGameException {
        String gameId = createAGame("Rene").getGameId();
        Player player = new Player();
        player.setPlayerName("Joe");
        Game game = service.connectToGame(player, gameId);
        assertEquals(game.getPlayers().size(), 2);
        assertEquals(game.getStatus(), GameStatus.NEW);
        assertEquals(game.getPhase(), RoundPhase.ASK);
    }

    @Test
    public void testStartGame() throws InvalidParamException, InvalidGameException {
        String gameId = createAGame("Rene").getGameId();
        Player p1 = new Player();
        p1.setPlayerName("player1");
        Player p2 = new Player();
        p1.setPlayerName("player2");
        service.connectToGame(p1,  gameId);
        service.connectToGame(p2, gameId);
        Game game = service.startGame(gameId);
        assertEquals(game.getPhase(), RoundPhase.ASK);
        assertEquals(game.getStatus(), GameStatus.IN_PROGRESS);
        assertEquals(game.getPlayers().size(),3);
        assertNotEquals(null, game.getAsker());
        assertNotEquals(null, game.getQuestioned());
    }
}