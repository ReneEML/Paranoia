package com.paranoia.server.model;

public class Player {

    private String playerName;
    private PlayerType playerType;

    public String getPlayerName() {
        return playerName;
    }

    public PlayerType getPlayerType() {
        return playerType;
    }

    public void setPlayerType(PlayerType playerType) {
        this.playerType = playerType;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }
}
