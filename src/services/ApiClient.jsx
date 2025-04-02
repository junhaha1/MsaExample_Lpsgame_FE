class ApiClient{
  static SEVER_URL = "http://localhost:8080";
  static POST_RESULT = "/results";
  static GET_BY_ALIAS = "/results?alias=";

  static sendChoice(user, choice){
    return fetch(ApiClient.SEVER_URL + ApiClient.POST_RESULT, {
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
    return fetch(ApiClient.SEVER_URL + ApiClient.GET_BY_ALIAS + userAlias);
  }
}
export default ApiClient;