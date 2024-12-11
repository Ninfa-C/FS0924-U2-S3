const bookContainer = document.getElementById("bookContainer");

let bookArray;

const url = "https://striveschool-api.herokuapp.com/books";

document.addEventListener("load", init());

function init() {
  loadList();
  printCart()
}

async function loadList() {
  await fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      bookArray = [...data];
      printCards(bookArray);
    })
    .catch((error) => {
      console.log("Errore nel recupero dei dati: " + error);
    });
}
//console.log(bookArray)

function printCards(items) {
  bookContainer.innerHTML = "";
  items.forEach((item) => {
    bookContainer.appendChild(createCard(item));
  });
}

function createCard(item) {
  // Card container
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card  mb-3";
  col.appendChild(card);

  // Image
  const img = document.createElement("img");
  img.className = "card-img-top";
  img.setAttribute("src", item.img);
  img.setAttribute("alt", item.title);
  card.appendChild(img);

  // Card body
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.appendChild(cardBody);

  // Title
  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = item.title;
  cardBody.appendChild(title);

  // Category
  const badge = document.createElement("span");
  badge.className = "badge bg-dark";
  badge.textContent = item.category;
  cardBody.appendChild(badge);

  // Price
  const price = document.createElement("p");
  price.className = "card-text mt-3";
  price.textContent = `$${item.price}`;
  cardBody.appendChild(price);

  // Buttons container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "d-flex justify-content-center gap-2";
  cardBody.appendChild(buttonContainer);

  // Compra ora button
  const buyButton = document.createElement("button");
  buyButton.className = "btn btn-danger btn-sm";
  buyButton.innerHTML = '<i class="bi bi-bag-plus" id="add">Aggiungi</i>';
  buyButton.addEventListener("click", () => addToCart(item));
  buttonContainer.appendChild(buyButton);

  // Scarta button
  const discardButton = document.createElement("button");
  discardButton.className = "btn btn-outline-secondary btn-sm";
  discardButton.textContent = "Scarta";
  discardButton.addEventListener("click", () => removeFromBookArray(item));
  buttonContainer.appendChild(discardButton);

  return col;
}

function addToCart(item) {
  let cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
  cartInfo.push(item);
  localStorage.setItem("cart", JSON.stringify(cartInfo));
  //console.log(cartInfo);
  printCart()
}

function removeFromBookArray(item) {
  const index = bookArray.findIndex((book) => book.asin === item.asin);
  if (index !== -1) {
    bookArray.splice(index, 1);
    console.log(`Removed: ${item.title}`);
    console.log(bookArray);
    printCards(bookArray);
    return
  } else {
    console.log("Item not found in the array.");
    return
  }
}

function printCart() {
  const cartList = document.getElementById("cart-list");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartList.innerHTML = ""; //to do list logic

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex justify-content-between";
      listItem.textContent = `${item.title} - ${item.price}`;
      const trash = document.createElement("span");
      trash.innerHTML = '<i class="bi bi-trash3"></i>';
      trash.addEventListener("click", () => removeFromCart(item));
      listItem.appendChild(trash);
      cartList.appendChild(listItem);
      return
    });
  } else {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "list-group-item text-muted";
    emptyMessage.textContent = "Your cart is empty.";
    cartList.appendChild(emptyMessage);
    return
  }
};

function removeFromCart(item) {
  let cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cartInfo.findIndex((cartItem) => cartItem.asin === item.asin);

  if (index !== -1) {
    cartInfo.splice(index, 1); // Rimuovi l'elemento dal carrello
    localStorage.setItem("cart", JSON.stringify(cartInfo)); // Aggiorna il localStorage
    //alert(`${item.title} è stato rimosso dal carrello.`);
    printCart()
    console.log(cartInfo);
    return
  } else {
    console.log("L'elemento non è stato trovato nel carrello.");
    return
  }
}
