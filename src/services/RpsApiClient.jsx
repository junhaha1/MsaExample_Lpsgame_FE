class RpsApiClient{
  static SEVER_URL = "http://localhost:8000";
  static POST_RESULT = "/results";
  static GET_BY_ALIAS = "/results?alias=";

  static sendChoice(user, choice){
    return fetch(RpsApiClient.SEVER_URL + RpsApiClient.POST_RESULT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAlias: user,
        userChoice: choice,
      }),
    });
  }

  static getAttempts(userAlias){
    console.log("Get attempts for " + userAlias);
    return fetch(RpsApiClient.SEVER_URL + RpsApiClient.GET_BY_ALIAS + userAlias);
  }
}
export default RpsApiClient;