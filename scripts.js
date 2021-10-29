/* Cookies */
const buttonAcceptCookies = document.getElementById(
  "btn-accept-cookie"
);
const cookiesBanner = document.getElementById("cookies__banner");
const backgroundCookies = document.getElementById(
  "background__cookies"
);

/*if cookies has not accepted*/
if (!localStorage.getItem("cookies-accepted")) {
  cookiesBanner.classList.add("active");
  backgroundCookies.classList.add("active");
}

/*Click btn to ocult banner and background*/
buttonAcceptCookies.addEventListener("click", () => {
  cookiesBanner.classList.remove("active");
  backgroundCookies.classList.remove("active");

  localStorage.setItem("cookies-accepted", true);
});

/*Scroll to top */
const scrollTop = document.getElementById(
  "scroll-to-top__button"
);

const pxInit = () =>
  document.documentElement.scrollTop || document.body.scrollTop;

const toTop = () => {
  if (pxInit() > 0) {
    scrollTo(0, 0);
  }
};

const showToTop = () => {
  if (pxInit() > 100) {
    scrollTop.className = "show__scroll";
  } else {
    scrollTop.className = "ocult";
  }
};

scrollTop.addEventListener("click", toTop);
window.addEventListener("scroll", showToTop);

/*PRELOADER*/

window.addEventListener("load", () => {
  const loaderContainer = document.querySelector(
    ".loader-container"
  );
  loaderContainer.style.opacity = 0;
  loaderContainer.style.visibility = "hidden";
});

/*Responsive menu
let menuToggle = document.querySelector(".menu--toggle");
let menuToggleIcon = document.querySelector(".menu--toggle i");
let menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");

  if (menu.classList.contains("show")) {
    menuToggleIcon.setAttribute("class", "fa fa-times");
  } else {
    menuToggleIcon.setAttribute("class", "fa fa-bars");
  }
});
/*Select types of clothes
let cBodys = document.getElementById("bodys");
let cTops = document.getElementById("tops");
let containerT1 = document.getElementById("type1");
let containerT2 = document.getElementById("type2");

cBodys.addEventListener("click", () => {
  containerT1.className = "container-1";
  containerT2.className = "hide";
});

cTops.addEventListener("click", () => {
  containerT1.className = "hide";
  containerT2.className = "container-2";
});*/

/*Add to cart*/

const Clickbutton = document.querySelectorAll(".add-to-cart");
const tbody = document.querySelector(".tbody");
const cartSection = document.getElementById("cart");
let cart = [];

Clickbutton.forEach((btn) => {
  btn.addEventListener("click", addToCartItem);
});

function addToCartItem(e) {
  const button = e.target;
  const item = button.closest(".item");
  const itemT = item.querySelectorAll(".text .title");
  const itemP = item.querySelectorAll(".text .price");
  for (i = 0; i < itemT.length; i++) {
    let itemTitle = itemT[i].textContent;
    let itemPrice = itemP[i].textContent;
    const newItem = {
      title: itemTitle,
      price: itemPrice,
      cantidad: 1,
    };
    addCartItem(newItem);
  }
}

function addCartItem(newItem) {
  const alert = document.querySelector(".alert");

  setTimeout(() => {
    alert.classList.add("hide");
  }, 3000);
  alert.classList.remove("hide");

  const InputElemnto = tbody.getElementsByClassName(
    "input__elemento"
  );
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].title.trim() === newItem.title.trim()) {
      cart[i].cantidad++;
      const inputValue = InputElemnto[i];
      inputValue.value++;
      cartTotal();
      return null;
    }
  }

  cartSection.classList.remove("hide");
  cart.push(newItem);
  showCart();
}

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].title.trim() === title.trim()) {
      cart.splice(i, 1);
    }
  }
  const alert1 = document.querySelector(".alert1");
  setTimeout(() => {
    alert1.classList.add("hide");
  }, 3000);
  alert1.classList.remove("hide");
  tr.remove();
  cartTotal();
}

function showCart() {
  tbody.innerHTML = "";
  cart.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("ItemCarrito");
    const Content = `
    
    <th scope="row" class="title">${item.title}</th>

            <td class="table__price"><p>${item.price}</p></td>
            <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
            <td><a class="delete btn btn-danger">x</a>
            </td>
    
    `;
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener(
      "click",
      removeItemCarrito
    );
    tr.querySelector(".input__elemento").addEventListener(
      "change",
      sumaCantidad
    );
  });
  cartTotal();
}
function cartTotal() {
  let Total = 0;
  const itemCartTotal = document.querySelector(".total");

  cart.forEach((item) => {
    const precio = Number(item.price.replace("$", ""));
    Total = Total + precio * item.cantidad;
  });

  itemCartTotal.innerHTML = `Total $${Total}`;
  return Total;
}
function sumaCantidad(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  cart.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value < 1
        ? (sumaInput.value = 1)
        : sumaInput.value;
      item.cantidad = sumaInput.value;
      cartTotal();
    }
  });
}

let send = document.getElementById("send__message");

send.addEventListener("click", () => {
  const name1 = document.getElementById("name").value;
  const location1 = document.getElementById("location").value;
  let total = cartTotal();
  const prendas = document.querySelectorAll(
    ".ItemCarrito .title"
  );
  const cantidades = document.querySelectorAll(
    ".input__elemento"
  );
  const pago = document.getElementById("pago").value;
  if (name1 === "" || location1 === "") {
    alert("Completa los datos primero");
  } else {
    function mensaje() {
      const prenda1 = [];
      const cant1 = [];
      let part2 = "";
      let part1 =
        "https://api.whatsapp.com//send?phone=584244684654&text=Hola+quiero+realizar+una+compra,+acá+te+dejo+los+detalles+de+mi+pedido:%0A%0APrendas:%20%20%0A";

      for (let i = 0; i < prendas.length; i++) {
        const prenda = prendas[i].textContent;
        const cant = cantidades[i].value;

        prenda1.push(prenda);
        cant1.push(cant);
        part2 +=
          encodeURIComponent(`${prenda} x ${cant}`) + "%0A";
      }
      let part3 =
        "%0ATotal:%20%20" +
        encodeURIComponent(total) +
        "$%0A" +
        "Método+de+pago: " +
        encodeURIComponent(pago);
      let part4 =
        "%0A%0AY+mis+datos+son:" +
        "%0ANombre:%20%20" +
        encodeURIComponent(name1) +
        "%0ADirección:%20%20" +
        encodeURIComponent(location1) +
        "%0A%0A¡Muchas+Gracias!%20%20";

      let url = part1 + part2 + part3 + part4;

      window.open(url);
    }

    mensaje();
  }
});
