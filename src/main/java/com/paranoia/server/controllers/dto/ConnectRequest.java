package com.paranoia.server.controllers.dto;

import com.paranoia.server.model.Player;

public class ConnectRequest {
    private Player player;
    private final String gameId;

    public ConnectRequest(Player player, String gameId) {
        this.player = player;
        this.gameId = gameId;
    }

    public String getGameId() {
        return gameId;
    }

    public Player getPlayer() {
        return player;
    }
}
