const cart = [];
let cart_total = 0;

function Login() {
    let user = document.getElementById("lg-user").value;
    let pass = document.getElementById("lg-pass").value;

    if (Users.some(e => (e.username === user || e.email === user) && e.password === pass)) {
        window.location.href = "index.html";
    } else {
        let lg_error = document.getElementById("lg-error");
        lg_error.innerHTML = "Usuario o contraseña incorrectos";
        lg_error.style.display = "block";
    }
}

function LoadProducts() {
    let productsHTML = document.getElementById("products");

    products.forEach(product => {
        productsHTML.innerHTML += `
        <div class="product">
            <div class="product-img" style="background-image: url('${product.image}')">
                <div class="price">${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €</div>
            </div>
            <h3>${product.name}</h3>
            <div class="description">${product.description}</div>
            <button class="product-add" onclick="addCartItem('${product.name}', ${product.price}, '${product.image}')" ${product.stock < 1 ? "disabled" : ""}>Añadir al carrito</button>
        </div>
        `;
    });
}

function addCartItem(name, price, image) {
    let itemid = getCartItemId();
    let amount = 1;

    cart.push({
        itemid,
        name,
        price,
        image,
        amount
    });

    cart_total += price * amount;

    cart_total = Math.round(cart_total * 100) / 100;

    let cartHTML = document.getElementById("cart");

    cartHTML.innerHTML += `
        <div class="item" id="${itemid}">
            <div class="item-image" style="background-image: url('${image}');"></div>
            <div class="item-label">
                <div class="item-name">${name}</div>
                <div class="item-info">${amount}x / ${price} € / Total ${amount * price} €</div>
                <div onclick="deleteCartItem('${itemid}')"><i class="fa-solid fa-trash-can delete"></i></div>
            </div>
        </div>
    `;

    let cartTotalHTML = document.getElementById("cart_total");
    cartTotalHTML.innerHTML = `Pagar: ${cart_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`;
}

function deleteCartItem(id) {
    let item = document.getElementById(id);
    item.remove();

    let index = cart.findIndex(e => e.itemid === id);
    cart_total -= cart[index].price * cart[index].amount;
    cart_total = Math.round(cart_total * 100) / 100;
    cart.splice(index, 1);

    let cartTotalHTML = document.getElementById("cart_total");
    cartTotalHTML.innerHTML = `Pagar: ${cart_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`;
}

function getCartItemId() {
    let id = Math.floor(Math.random() * 9999999999);
    if (cart.some(e => e.itemid === id)) {
        id = getCartItemId();
    }
    return "item-" + id;
}