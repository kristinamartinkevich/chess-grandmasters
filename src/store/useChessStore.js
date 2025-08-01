import { create } from 'zustand';
import { chessApi } from '../services/chessApi';

export const useChessStore = create((set, get) => ({
    // Grandmasters state
    grandmasters: [],
    filteredGrandmasters: [],
    grandmastersLoading: false,
    grandmastersError: null,
    searchTerm: '',

    // Player profile state
    currentPlayer: null,
    playerLoading: false,
    playerError: null,

    // Actions for grandmasters
    setSearchTerm: (term) => {
        set({ searchTerm: term });
        const { grandmasters } = get();
        const filtered = grandmasters.filter(username =>
            username.toLowerCase().includes(term.toLowerCase())
        );
        set({ filteredGrandmasters: filtered });
    },

    fetchGrandmasters: async () => {
        set({ grandmastersLoading: true, grandmastersError: null });
        try {
            const players = await chessApi.getGrandmasters();
            set({
                grandmasters: players,
                filteredGrandmasters: players,
                grandmastersLoading: false
            });
        } catch (error) {
            set({
                grandmastersError: error.message,
                grandmastersLoading: false
            });
        }
    },

    // Actions for player profile
    fetchPlayerProfile: async (username) => {
        set({ playerLoading: true, playerError: null });
        try {
            const playerData = await chessApi.getPlayerProfile(username);
            set({
                currentPlayer: playerData,
                playerLoading: false
            });
        } catch (error) {
            set({
                playerError: error.message,
                playerLoading: false
            });
        }
    },

    clearPlayerProfile: () => {
        set({ currentPlayer: null, playerError: null });
    },

    // Retry actions
    retryFetchGrandmasters: () => {
        const { fetchGrandmasters } = get();
        fetchGrandmasters();
    },

    retryFetchPlayerProfile: (username) => {
        const { fetchPlayerProfile } = get();
        fetchPlayerProfile(username);
    }
}));