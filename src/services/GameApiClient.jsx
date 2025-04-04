class GameApiClient {
  static SEVER_URL = "http://localhost:8000";
  static GET_READERBOARD = "/leaders";
  static GET_USERS_BY_IDS = "/stats";

  static leaderBoard(){
    return fetch(GameApiClient.SEVER_URL + GameApiClient.GET_READERBOARD);
  }

  static getState(userId){
    return fetch(GameApiClient.SEVER_URL + GameApiClient.GET_USERS_BY_IDS + "?userId=" + userId);
  }
}

export default GameApiClient;