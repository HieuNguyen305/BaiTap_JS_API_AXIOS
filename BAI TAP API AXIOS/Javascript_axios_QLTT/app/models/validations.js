function Validations() {
  this.kiemTraRong = function (value, errorId, mess) {
    if (value === "") {
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    }
    getEle(errorId).innerHTML = "";
    getEle(errorId).style.display = "none";
    return true;
  };
  this.kiemTraEmail = function (value, errorId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }

    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };
}
