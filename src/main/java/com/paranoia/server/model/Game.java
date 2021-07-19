package com.paranoia.server.model;

import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

public class Game {
    private Player host;
    private ArrayList<Player> players;
    private String gameId;
    private Player Asker;
    private Player Questioned;
    private GameStatus status;
    private String Question;
    private String Answer;
    private RoundPhase phase;
    private boolean showAnswer;
    private int currentAsker;

    public Game(Player player) {
        this.players = new ArrayList<Player>();
        this.host = player;
        this.players.add(player);
        this.status = GameStatus.NEW;
        this.gameId = UUID.randomUUID().toString();
        this.setPhase(RoundPhase.ASK);
    }
    public void addPlayer (Player player){
        players.add(player);
    }

    public void removePlayer(String login){
        for(Player x: players) {
            if (x.getLogin() == login) {
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
        Asker = players.get(currentAsker);
        int questionIndex = 0;
        do{
            questionIndex = ThreadLocalRandom.current().nextInt(0, players.size());
        }while(questionIndex == currentAsker);
        Questioned = players.get(questionIndex);
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public GameStatus getStatus() {
        return status;
    }

    public Player getAsker() {
        return Asker;
    }

    public Player getHost() {
        return host;
    }

    public Player getQuestioned() {
        return Questioned;
    }

    public String getAnswer() {
        return Answer;
    }

    public String getGameId() {
        return gameId;
    }

    public String getQuestion() {
        return Question;
    }

    public void setQuestioned(Player questioned) {
        Questioned = questioned;
    }

    public void setAnswer(String answer) {
        Answer = answer;
    }

    public void setAsker(Player asker) {
        Asker = asker;
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
        Question = question;
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
