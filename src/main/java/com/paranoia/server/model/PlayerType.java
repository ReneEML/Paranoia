package com.paranoia.server.model;

public enum PlayerType {
    ASKER(0), QUESTION(1), SPECTATOR(2);
    public final int val;

    PlayerType(int val) {
        this.val = val;
    }
}
