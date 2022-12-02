function User() {
  this.getInfoUserApi = function () {
    return axios({
      url: "https://637b69966f4024eac20ce0aa.mockapi.io/api/ProductApiAxios",
      method: "GET",
    });
  };
}
