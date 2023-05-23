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
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <div>${product.description}</div>
            <div class="price">${product.price} €</div>
        </div>
        `;
    });
}