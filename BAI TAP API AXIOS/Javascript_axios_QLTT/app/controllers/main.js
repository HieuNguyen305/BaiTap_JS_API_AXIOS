var user = new User();
var validation = new Validations();

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
            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="editUser(${
              user.id
            })">Edit</button>
            <button class="btn btn-danger" onclick="deleteUser(${
              user.id
            })">Delete</button>
        </td>
    </tr>
    `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}
/**
 * Delete Button
 */
function deleteUser(id) {
  user
    .deleteUserApi(id)
    .then(function (rs) {
      alert(
        `Bạn vừa xóa người dùng có stt là : ${rs.data.id} - tài khoản là : ${rs.data.taiKhoan}`
      );
      getUser();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemNguoiDung").onclick = function () {
  var content = "Add User";
  document.getElementsByClassName("modal-title")[0].innerHTML = content;
  var button = `<button class="btn btn-primary" onclick="getInfoUser()">ADD USER</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
  // var sv = true;
  // if (sv) {
  //   userList.addUser(sv);
  //   renderHTML(userList.arr);
  // }
};

/**
 * Edit User
 */
function editUser(id) {
  var content = "Edit User";
  document.getElementsByClassName("modal-title")[0].innerHTML = content;
  var button = `<button class="btn btn-primary" onclick="updateUser(${id})">Update User</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
  user
    .getUserByIdApi(id)
    .then(function (rs) {
      var editUser = rs.data;
      getEle("TaiKhoan").value = editUser.taiKhoan;
      getEle("HoTen").value = editUser.hoTen;
      getEle("MatKhau").value = editUser.matKhau;
      getEle("Email").value = editUser.email;
      getEle("HinhAnh").value = editUser.hinhAnh;
      getEle("loaiNguoiDung").value = editUser.loaiND;
      getEle("loaiNgonNgu").value = editUser.ngonNgu;
      getEle("MoTa").value = editUser.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update User
 */
function updateUser(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  var product = new Product(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa
  );
  user
    .updateUserByIdApi(product)
    .then(function () {
      alert("Update Complete!");
      getUser();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * Add User
 */
// function addUser(isAdd) {
function getInfoUser() {
  // hàm này chỉ mới fetch cái thông tin user mà mình nhập vào thôi
  // oke hem?
  // Nghĩa là hàm adduser trên chỉ mới nhận được giá trị khi mình nhập vào thôi hả b, vậy h mình phải làm thêm cái hàm khác à ? , viết hàm addUser để push user hứng lại ìnoUser chỗ này ... oke ko? ok, out nhé
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  console.log(taiKhoan);
  var nguoiDung = new Product(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa
  );
  //Flag
  var flag = true;
  // Check Validation
  //Tài Khoản
  flag &=
    validation.kiemTraRong(
      taiKhoan,
      "errorTK",
      "(*)Vui lòng nhập vào tài khoản"
    ) &&
    validation.kiemTraTrungTaiKhoan(
      taiKhoan,
      "errorTK",
      "(*) Tài khoản đã tồn tại",
      user
    );

  //Họ Tên
  flag &=
    validation.kiemTraRong(hoTen, "errorName", "(*) Vui lòng nhập họ tên") &&
    validation.kiemTraChuoiKitu(hoTen, "errorName", "(*) Vui lòng nhập kí tự");
  //Mật Khẩu
  flag &=
    validation.kiemTraRong(matKhau, "errorMK", "(*) Vui lòng nhập mật khẩu") &&
    validation.kiemTraMatKhau(
      matKhau,
      "errorMK",
      "(*) Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và 6-8 ký tự, 6, 8"
    );
  // Email
  flag &=
    validation.kiemTraRong(email, "errorEmail", "(*) Vui long nhap email") &&
    validation.kiemTraEmail(
      email,
      "errorEmail",
      "(*) Vui long nhap email dung dinh dang"
    );
  //Hình Ảnh
  flag &= validation.kiemTraRong(
    hinhAnh,
    "errorPic",
    "(*) Vui lòng nhập hình ảnh"
  );
  //Loại Người Dùng
  flag &= validation.kiemTraSelect(
    "loaiNguoiDung",
    "errorLND",
    "(*) Chọn Người Dùng"
  );
  //Loại Ngôn Ngữ
  flag &= validation.kiemTraSelect(
    "loaiNgonNgu",
    "errorLNN",
    "(*) Chọn Ngôn Ngữ"
  );
  //Mô Tả
  flag &=
    validation.kiemTraRong(moTa, "errorMoTa", "(*) Vui lòng nhập mô tả") &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "errorMoTa",
      "(*) Mô tả không được vượt quá 60 kí tự"
    );

  if (flag === true) {
    user
      .addUserApi(nguoiDung)
      .then(function (rs) {
        alert("Add Success!");
        getUser();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
