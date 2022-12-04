function User() {
  this.getInfoUserApi = function () {
    return axios({
      url: "https://637b69966f4024eac20ce0aa.mockapi.io/api/ProductApiAxios",
      method: "GET",
    });
  };
  this.deleteUserApi = function (id) {
    return axios({
      url: `https://637b69966f4024eac20ce0aa.mockapi.io/api/ProductApiAxios/${id}`,
      method: "DELETE",
    });
  };
  this.addUserApi = function (product) {
    return axios({
      url: `https://637b69966f4024eac20ce0aa.mockapi.io/api/ProductApiAxios/`,
      method: "POST",
      data: product,
    });
  };
  this.getUserByIdApi = function (id) {
    return axios({
      url: `https://637b69966f4024eac20ce0aa.mockapi.io/api/ProductApiAxios/${id}`,
      method: "GET",
    });
  };
  this.updateUserByIdApi = function (product) {
    return axios({
      url: `https://637b69966f4024eac20ce0aa.mockapi.io/api/ProductApiAxios/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}

