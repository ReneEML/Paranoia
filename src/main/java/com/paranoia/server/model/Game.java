package com.paranoia.server.model;

import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

public class Game {
    private Player host;
    private ArrayList<Player> players;
    private String gameId;
    private Player asker;
    private Player questioned;
    private GameStatus status;
    private String question;
    private String answer;
    private RoundPhase phase;
    private boolean showAnswer;
    private int currentAsker;

    public Game(Player player) {
        this.players = new ArrayList<>();
        this.host = player;
        this.players.add(player);
        this.status = GameStatus.NEW;
        this.gameId = UUID.randomUUID().toString();
        this.setPhase(RoundPhase.ASK);
    }
    public void addPlayer (Player player){
        players.add(player);
    }

    public void removePlayer(String name){
        for(Player x: players) {
            if (x.getPlayerName().equals(name)) {
                players.remove(x);
                break;
            }
        }
    }

    public void startRound() {
        currentAsker ++;
        if(currentAsker >= players.size()){
            currentAsker = 0;
        }
        asker = players.get(currentAsker);
        int questionIndex;
        do{
            questionIndex = ThreadLocalRandom.current().nextInt(0, players.size());
        }while(questionIndex == currentAsker);
        questioned = players.get(questionIndex);
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public GameStatus getStatus() {
        return status;
    }

    public Player getAsker() {
        return asker;
    }

    public Player getHost() {
        return host;
    }

    public Player getQuestioned() {
        return questioned;
    }

    public String getAnswer() {
        return answer;
    }

    public String getGameId() {
        return gameId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestioned(Player questioned) {
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public void setAsker(Player asker) {
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public void setHost(Player host) {
        this.host = host;
    }

    public void setPlayers(ArrayList<Player> players) {
        this.players = players;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setStatus(GameStatus status) {
        this.status = status;
    }

    public RoundPhase getPhase() {
        return phase;
    }

    public void setPhase(RoundPhase phase) {
        this.phase = phase;
    }

    public boolean isShowAnswer() {
        return showAnswer;
    }

    public void setShowAnswer(boolean showAnswer) {
        this.showAnswer = showAnswer;
    }
}
