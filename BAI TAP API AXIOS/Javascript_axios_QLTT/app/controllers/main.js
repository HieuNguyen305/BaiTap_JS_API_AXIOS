var user = new User();
function getEle(id) {
  return document.getElementById(id);
}

function getUser() {
  user
    .getInfoUserApi()
    .then(function (rs) {
      renderHTML(rs.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getUser();

function renderHTML(data) {
  var content = "";
  data.forEach(function (user, index) {
    content += `
    <tr>
        <td>${index + 1}</td>
        <td>${user.taiKhoan}</td>
        <td>${user.matKhau}</td>
        <td>${user.hoTen}</td>
        <td>${user.email}</td>
        <td>${user.ngonNgu}</td>
        <td>${user.loaiND}</td>
        <td>
            <button class="btn btn-primary">Edit</button>
            <button class="btn btn-info">Delete</button>
        </td>
    </tr>
    `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}
