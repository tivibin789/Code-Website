function addToCart(object) {
    var isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (!isLoggedIn) {
        alert('Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng');
        return;
    }
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