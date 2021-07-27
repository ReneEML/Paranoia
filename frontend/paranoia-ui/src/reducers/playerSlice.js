import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '../app/requests';


export const joinGame = createAsyncThunk(
    'player/joinGame',
    async (request, thunkAPI) => {
        const { endpoint, data } = request;
        const response = await POST(endpoint, data);
        console.log(response);
        return {
            gameId: response.gameId,
            playerName: data.playerName
        };
    }
)

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        loading: "LOADING",
        inGame: false,
        gameId: "",
        playerId: "",
        playerName: "",
    },
    reducers: {
        leaveGame: state => {
            state.inGame = false
        },
        setPlayerId: (state, { payload }) => {
            state.playerId = payload
        },
        setGameId: (state, { payload }) => {
            state.gameId = payload
        },
        setPlayerName: (state, { payload }) => {
            state.playerName = payload
        }
    },
    extraReducers: {
        [joinGame.pending]: (state) => {
            state.loading = 'LOADING';
        },
        [joinGame.fulfilled]: (state, { payload }) => {
            state.gameId = payload.gameId
            state.playerName = payload.playerName
            state.loading = 'FULFILLED';
        }
    }

});

export const { leaveGame, setPlayerId, setGameId, setPlayerName } = playerSlice.actions;

export const selectInGame = state => state.player.inGame;

export const selectPlayerId = state => state.player.playerId;

export const selectPlayerName = state => state.player.playerName;

export const selectGameId = state => state.player.gameId;

export const selectLoading = state => state.player.loading;




export default playerSlice.reducer;
