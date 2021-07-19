package com.paranoia.server.exception;

public class InvalidPhaseException extends Exception{
    private String message;

    public InvalidPhaseException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
