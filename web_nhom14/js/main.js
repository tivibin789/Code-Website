function buy() {
    var data = JSON.parse(localStorage.getItem("data"));
    var message = document.getElementById('message-cart');
    message.style.display = "block";
    if (data == null || data.length == 0) {
        message.innerText = "Bạn chưa chọn sản phẩm nào để mua";
    }
    else {
        message.innerText = "Thanh toán thành công";
        var btn_buy = document.getElementById('btn-buy');
        btn_buy.style.opacity = 0;
    }
    clearData();
}
function decrease(btn) {
    var row_index = parseInt(btn.parentElement.parentElement.children[0].innerText) - 1;
    var data = JSON.parse(localStorage.getItem("data"));
    data[row_index][3] -= data[row_index][3] / data[row_index][2];
    data[row_index][2] -= 1;
    if (data[row_index][2] == 0) {
        data.splice(row_index, 1);
    }
    localStorage.setItem("data", JSON.stringify(data));
    loadData();
}
function increase(btn) {
    var row_index = parseInt(btn.parentElement.parentElement.children[0].innerText) - 1;
    var data = JSON.parse(localStorage.getItem("data"));
    data[row_index][3] += data[row_index][3] / data[row_index][2];
    data[row_index][2] += 1;
    if (data[row_index][2] == 0) {
        data.splice(row_index, 1);
    }
    localStorage.setItem("data", JSON.stringify(data));
    loadData();
}
function insertDataToTable() {
    var data = JSON.parse(localStorage.getItem("data"));
    var btn_buy = document.getElementById('btn-buy');
    btn_buy.style.opacity = 1;
    var message = document.getElementById('message-cart');
    message.style.display = "none";
    var bang = document.getElementById('table');
    bang.style.display = "block";
    if (data == null || data.length == 0) {
        bang.style.display = "none";
        message.innerText = "Chưa có sản phẩm trong giỏ hàng";
        message.style.display = "block";
        return;
    }

    var table = document.getElementById('table');
    var total = 0;
    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow();
        row.insertCell().innerHTML = '<p style="text-align:center;">'+(i + 1)+'</p>';
        row.insertCell().innerHTML = '<p style="text-align:center;">'+data[i][0];+'</p>';
        row.insertCell().innerHTML = '<img style="width:80px;heigth:80px;" src="' + data[i][1] + '">';
        row.insertCell().innerHTML = '<button style="float:left;margin-right:15px;" onclick="decrease(this)">-</button>' + data[i][2]+' SP'+ '<button style="float:right;" onclick="increase(this)">+</button>';
        row.insertCell().innerHTML = data[i][3]+' VNĐ';
        total += parseInt(data[i][3]);

    }
    row = table.insertRow();
    var cell = row.insertCell();
    cell.colSpan = 4;
    cell.innerHTML = ' Tổng tiền:';
    row.insertCell().innerHTML = total+' VNĐ';
}
function reset_table() {
    var table = document.getElementById('table');
    var n = table.rows.length;
    for (let i = 1; i < n; i++) {
        table.deleteRow(1);
    }
}
function loadData() {
    var bang = document.getElementById('table');
    bang.style.display = "block";
    reset_table();
    insertDataToTable();
}
function clearData() {
    localStorage.clear();
}
function addToCart(object) {
    // var isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    // if (!isLoggedIn) {
    //     alert('Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng');
    //     return;
    // }
    var listchildren = object.parentElement.parentElement.children;

    var name = listchildren[0].children[1].innerText;

    var listico = listchildren[1].children[2].children;
    for (let i = 0; i < listico.length; i++) {
        if (listico[i].classList.contains('active-ico')) {
            var activeico = listico[i];
            break;
        }
    }
    var img = activeico.src;
    var amount = 1;
    var price = listchildren[1].children[3].children[0].innerText;//name img amount total

    price = price.replaceAll(',', '');

    price = price.replace('VNĐ', '');

    price = parseInt(price);

    var data = JSON.parse(localStorage.getItem("data"));
    var update = false;
    if (data != null) {
        for (let i = 0; i < data.length; i++) {
            if (data[i][1] == img) {
                data[i][2] += amount;
                data[i][3] += price;
                update = true;
                break;
            }
        }
        if (!update) {
            let a = new Array(name, img, amount, price);
            data.push(a);
        }
    } else {
        let a = new Array(name, img, amount, price);
        data = new Array(a);
    }

    localStorage.setItem("data", JSON.stringify(data));

}

function search_product() {
    let search = document.getElementById('search');
    let value = search.value.toUpperCase().trim();
    let array_product = document.getElementsByClassName('product');
    let n = 0;
    for (let i = 0; i < array_product.length; i++) {
        let name_product = array_product[i].children[0].children[0].children[1].children[0];
        let name = name_product.innerHTML.toUpperCase().trim();
        let count = 0;
        for (let y = 0; y < name.length; y++) {
            if (name[y] == value[count]) {
                count++;
                if (count == value.length && (name[y + 1] == ' ' || y == name.length - 1)) {
                    break;
                }
            }
            else {
                y++;
                while (name[y] != ' ' && y != (name.length)) {
                    y++;
                }
                while (name[y] == ' ') {
                    y++;
                }
                if (name[y] != ' ') {
                    y--;
                }
                count = 0;
            }
        }
        if (count == value.length) {
            array_product[i].style.display = "block";
            n++;
        } else {
            array_product[i].style.display = "none";
        }
    }
    let result_message = document.getElementById("result-message");
    result_message.style.display = "block";
    if (n == 0) {
        result_message.innerText = "Không tìm thấy kết quả phù hợp";
    } else {
        if (n == array_product.length) {
            result_message.style.display = "none";
        }
        else {
            result_message.innerText = "Tìm thấy " + n + " kết quả phù hợp";
        }

    }
}
function change(img, type) {
    if (type == 1) {
        img.classList.add('active-ico');
        var display_image = img.parentElement.previousElementSibling;
        display_image.src = img.src;
        var parent = img.parentElement;
        var array_ico = parent.children;
        for (var i = 0; i < array_ico.length; i++) {
            if (array_ico[i] != img) {
                array_ico[i].classList.remove('active-ico');
            }
        }
    } else {
        if (type == 2) {
            img.classList.add('active-ico');
            var array_ico = img.parentElement.children;
            var index;
            for (var i = 0; i < array_ico.length; i++) {
                if (array_ico[i] == img) {
                    index = i;
                }
                else {
                    array_ico[i].classList.remove('active-ico');
                }
            }
            var content_array = img.parentElement.previousElementSibling.children;
            for (var i = 0; i < content_array.length; i++) {
                if (content_array[i] != index) {
                    content_array[i].classList.remove('content-active');
                }
            }
            content_array[index].classList.add('content-active');
            var contents = img.parentElement.previousElementSibling.children;
            var active_content;
            for (var i = 0; i < contents.length; i++) {
                if (contents[i].classList.contains('content-active')) {
                    active_content = contents[i];
                    break;
                }
            }
            var detail_list_ico = active_content.children;
            for (var i = 0; i < detail_list_ico.length; i++) {
                if (detail_list_ico[i].classList.contains('active-ico')) {
                    change(detail_list_ico[i], 3);
                    break;
                }
            }
        }
        else {
            if (type == 3) {
                img.classList.add('active-ico');
                var display_image = img.parentElement.parentElement.previousElementSibling;
                display_image.src = img.src;
                var parent = img.parentElement;
                var detail_list_ico = parent.children;
                for (var i = 0; i < detail_list_ico.length; i++) {
                    if (detail_list_ico[i] != img) {
                        detail_list_ico[i].classList.remove('active-ico');
                    }
                }
            }
        }
    }
}
document.getElementById('form-1').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var messageElement = document.getElementById('message');
    messageElement.classList.add('show');
    setTimeout(function() {
        messageElement.classList.remove('show');
        window.location.href = "Login.html";
    },800);
});
document.getElementById('form-23').addEventListener('submit', function(event) {
    event.preventDefault();   
    window.location.href = 'index.html';   
});
// Tìm liên kết đăng nhập và thêm sự kiện click
// Tìm liên kết đăng nhập và thêm sự kiện click
var loginLink = document.getElementById('dn');
window.onload = function() {
    // Tìm liên kết đăng nhập và thêm sự kiện click
    var loginLink = document.getElementById('dn');
    loginLink.addEventListener('click', function(event) {
        // Khi liên kết đăng nhập được nhấp, đặt trạng thái đăng nhập thành true
        localStorage.setItem('isLoggedIn', true);
    });
}
//js admin
    //  let currentRow; // Biến để lưu trữ hàng đang được chỉnh sửa

// Hàm mở modal chỉnh sửa với thông tin người dùng
// function openEditModal(name, email, row) {
//     // Lưu trữ hàng đang được chỉnh sửa
//     currentRow = row;

//     // Hiển thị modal
//     document.getElementById('editModal').style.display = 'block';
//     // Hiển thị overlay
//     document.getElementById('overlay').style.display = 'block';

//     // Đặt giá trị cho các trường trong modal
//     document.getElementById('editName').value = name;
//     document.getElementById('editEmail').value = email;
// }

// // Hàm xóa người dùng
// function deleteUser(row) {
//     row.parentNode.removeChild(row);
// }
// document.getElementById('editForm').addEventListener('submit', function (e) {
//                 e.preventDefault();

//                 // Lấy giá trị mới từ form
//                 const newName = document.getElementById('editName').value;
//                 const newEmail = document.getElementById('editEmail').value;

//                 // Cập nhật nội dung trong hàng đang được chỉnh sửa
//                 currentRow.cells[0].innerText = newName;
//                 currentRow.cells[1].innerText = newEmail;

//                 // Ẩn modal
//                 document.getElementById('editModal').style.display = 'none';
//                 // Ẩn overlay
//                 document.getElementById('overlay').style.display = 'none';
//             });

//             // Ẩn modal khi nhấn vào overlay
//             document.getElementById('overlay').addEventListener('click', function () {
//                 document.getElementById('editModal').style.display = 'none';
//                 document.getElementById('overlay').style.display = 'none';
//             });

//             // Ẩn modal khi nhấn vào nút thoát
//             document.getElementById('closeModal').addEventListener('click', function () {
//                 document.getElementById('editModal').style.display = 'none';
//                 document.getElementById('overlay').style.display = 'none';
//             });
