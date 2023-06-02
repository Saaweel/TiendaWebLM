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

    products.forEach((product, i) => {
        productsHTML.innerHTML += `
        <div class="product" id="product-${i}">
            <div class="product-img" style="background-image: url('${product.image}')">
                <div class="price">${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €</div>
            </div>
            <h3>${product.name}</h3>
            <div class="description">${product.description}</div>
            <button class="product-add" onclick="addCartItem(${i}, '${product.name}', ${product.price}, '${product.image}')" ${product.stock < 1 ? "disabled" : ""}>Añadir al carrito</button>
        </div>
        `;
    });
}

function addCartItem(listid, name, price, image) {
    let amount = 1;

    products[listid].stock -= 1;

    if (products[listid].stock < 1) {
        let productHTML = document.getElementById(`product-${listid}`);
        productHTML.getElementsByClassName("product-add")[0].disabled = true;
    }

    cart_total += price * amount;

    cart_total = Math.round(cart_total * 100) / 100;

    if (cart.some(e => listid === e.listid)) {
        let index = cart.findIndex(e => listid === e.listid);
        cart[index].amount += amount;
        
        let item = document.getElementById(cart[index].itemid);
        let itemInfo = item.getElementsByClassName("item-info")[0];
        itemInfo.innerHTML = `${cart[index].amount}x / ${cart[index].price} € / Total ${cart[index].amount * cart[index].price} €`;
    } else {
        let itemid = getCartItemId();
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

        cart.push({
            itemid,
            name,
            price,
            image,
            amount,
            listid
        });
    }

    let cartTotalHTML = document.getElementById("cart_total");
    cartTotalHTML.innerHTML = `Pagar: ${cart_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`;
    cartTotalHTML.disabled = false;

}

function deleteCartItem(id) {
    let item = document.getElementById(id);
    item.remove();

    let index = cart.findIndex(e => e.itemid === id);
    cart_total -= cart[index].price * cart[index].amount;
    cart_total = Math.round(cart_total * 100) / 100;

    products[cart[index].listid].stock = cart[index].amount;

    if (products[cart[index].listid].stock > 0) {
        let productHTML = document.getElementById(`product-${cart[index].listid}`);
        productHTML.getElementsByClassName("product-add")[0].disabled = false;
    }

    cart.splice(index, 1);

    let cartTotalHTML = document.getElementById("cart_total");
    cartTotalHTML.innerHTML = `Pagar: ${cart_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`;

    if (cart.length < 1) {
        cartTotalHTML.disabled = true;
    }
}

function getCartItemId() {
    let id = Math.floor(Math.random() * 9999999999);
    if (cart.some(e => e.itemid === id)) {
        id = getCartItemId();
    }
    return "item-" + id;
}

function toggleCart() {
    let cartBoxs = document.getElementsByClassName("cart");
    for (let i = 0; i < cartBoxs.length; i++) {
        if (cartBoxs[i].style.display === "none") {
            cartBoxs[i].style.display = "flex";
        } else {
            cartBoxs[i].style.display = "none";
        }
    }
}

function openCheckout() {
    let checkout_total = document.getElementById("checkout_total");
    checkout_total.innerHTML = `Pagar <span style="color: green;">${cart_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €</span>`;

    let Checkout = document.getElementById("checkout");
    Checkout.style.display = "block";
}

function closeCheckout() {
    let Checkout = document.getElementById("checkout");
    Checkout.style.display = "none";
}

function pay() {
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let country = document.getElementById("country").value;
    let city = document.getElementById("city").value;
    let postal_code = document.getElementById("postal_code").value;
    let address = document.getElementById("address").value;

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let card_number = document.getElementById("card_number").value;
    let card_cvv = document.getElementById("card_cvv").value;
    let card_expiration = document.getElementById("card_expiration").value;

    let result = document.getElementById("checkout_result");

    if (email === "" || phone === "" || country === "" || city === "" || postal_code === "" || address === "" || name === "" || surname === "" || card_number === "" || card_cvv === "" || card_expiration === "") {
        result.innerHTML = "Todos los campos son obligatorios";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        result.innerHTML = "El email no es válido";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    if (phone.length != 9) {
        result.innerHTML = "El teléfono no es válido";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    if (postal_code.length != 5) {
        result.innerHTML = "El código postal no es válido";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    if (card_number.length != 16) {
        result.innerHTML = "El número de la tarjeta no es válido";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    if (card_cvv.length != 3) {
        result.innerHTML = "El CVV no es válido";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    if (card_expiration.length != 7) {
        result.innerHTML = "La fecha de caducidad no es válida";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    card_expiration = card_expiration.split("/");
    card_expiration = card_expiration[1] + "-" + card_expiration[0] + "-01";
    
    if (isNaN(Date.parse(card_expiration))) {
        result.innerHTML = "La fecha de caducidad no es válida";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    let date = new Date();
    let card_expiration_date = new Date(card_expiration);

    if (card_expiration_date < date) {
        result.innerHTML = "La tarjeta está caducada";
        result.style.display = "block";
        result.style.color = "red";
        return;
    }

    result.innerHTML = "Se está estableciendo la conexión con el banco...";
    result.style.display = "block";
    result.style.color = "blue";

    setTimeout(() => {
        result.innerHTML = "Pago realizado con éxito";
        result.style.display = "block";
        result.style.color = "green";
        
        setTimeout(() => {
            result.innerHTML = "";
            result.style.display = "none";
            closeCheckout();
            cart.splice(0, cart.length);
            cart_total = 0;
            let cartTotalHTML = document.getElementById("cart_total");
            cartTotalHTML.innerHTML = `Pagar: ${cart_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €`;
            cartTotalHTML.disabled = true;
            let cartItems = document.getElementById("cart");
            cartItems.innerHTML = "";
        }, 1500);
    }, 2500);
}