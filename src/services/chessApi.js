const BASE_URL = 'https://api.chess.com/pub';

export const chessApi = {
  // Fetch all grandmasters
  async getGrandmasters() {
    try {
      const response = await fetch(`${BASE_URL}/titled/GM`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.players || [];
    } catch (error) {
      console.error('Error fetching grandmasters:', error);
      throw error;
    }
  },

  // Fetch player profile
  async getPlayerProfile(username) {
    try {
      const response = await fetch(`${BASE_URL}/player/${username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching player profile:', error);
      throw error;
    }
  }
};