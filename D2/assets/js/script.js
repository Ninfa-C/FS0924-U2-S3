//come prima cosa intercettiamo gli elementi del DOM

const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const userForm = document.getElementById("userForm");

document.addEventListener('DOMContentLoaded', init);

function init() {
    print();
}


class User {
  constructor(_name, _surname) {
    this.name = _name;
    this.surname = _surname;
  }
}

function saveUsersToStorage(users) {
  localStorage.setItem("userArray", JSON.stringify(users));
}

function getUsersFromStorage() {
  const users = localStorage.getItem("userArray");
  return users ? JSON.parse(users) : [];
}

addButton.addEventListener("click", () => {
  const userName = document.getElementById("userName").value.trim();
  const surName = document.getElementById("surName").value.trim();
  if (userName && surName) {
    const user = new User(userName, surName);

    const users = getUsersFromStorage();
    users.push(user);
    saveUsersToStorage(users);
    alert("Utente registrato con successo!");
    userForm.reset();
    print();
  } else {
    alert("Compila entrambi i campi prima di salvare.");
  }
});

removeButton.addEventListener("click", () => {
  const userName = document.getElementById("userName").value.trim();
  const surName = document.getElementById("surName").value.trim();
  if (userName && surName) {
    let users = getUsersFromStorage();

    const initialLength = users.length;
    users = users.filter(
      (user) => !(user.name === userName && user.surname === surName)
    );

    if (users.length < initialLength) {
      saveUsersToStorage(users);
      alert("Utente rimosso con successo!");
      print();
    } else {
      alert("Utente non trovato.");
    }

    userForm.reset();
  } else {
    alert("Compila entrambi i campi per rimuovere un utente.");
  }
});

function print() {
  const users = getUsersFromStorage();
  const tableBody = document.getElementById("userTable");
  tableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    const userCell = document.createElement("td");
    userCell.textContent = index + 1;
    row.appendChild(userCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    const surnameCell = document.createElement("td");
    surnameCell.textContent = user.surname;
    row.appendChild(surnameCell);

    tableBody.appendChild(row);
  });
}

//iniziare recuperando il timer dal local storage cosìcchè non si azeri all'aggiornamento della pagina

let time = parseInt(sessionStorage.getItem("timeElapsed")) || 0;
//let time = 0

const timerDisplay = document.getElementById("timer");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

/* dopo aver intercettato l'alemento del DOM del timer, 
sovrascrivelo con innertext e la variabile che cambierà, ovvero il time*/
timerDisplay.textContent = formatTime(time);

// Funzione per aggiornare il contatore ogni secondo
const interval = setInterval(() => {
  time++;
  timerDisplay.textContent = formatTime(time);
  sessionStorage.setItem("timeElapsed", time);
}, 1000);
