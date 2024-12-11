//come prima cosa intercettiamo gli elementi del DOM

const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const userForm = document.getElementById("userForm");

document.addEventListener("DOMContentLoaded", init);
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
  //console.log(users);
}

function getUsersFromStorage() {
  const users = localStorage.getItem("userArray");
  return users ? JSON.parse(users) : [];
}

addButton.addEventListener("click", function (e) {
  e.preventDefault();
  const userName = document.getElementById("userName").value.trim();
  const surName = document.getElementById("surName").value.trim();
  if (userName && surName) {
    const user = new User(capitalize(userName), capitalize(surName));

    const users = getUsersFromStorage();
    users.push(user);
    saveUsersToStorage(users);
    alert("Utente registrato con successo!");
    userForm.reset();
    print();
  } else {
    alert("Compila entrambi i campi prima di salvare.");
    return;
  }
});

/*removeButton.addEventListener("click", function (e) {
  e.preventDefault();
  const userName = document.getElementById("userName").value.trim();
  const surName = document.getElementById("surName").value.trim();
  if (userName && surName) {
    let users = getUsersFromStorage();

    const initialLength = users.length;
    users = users.filter(
      (user) =>
        !(
          capitalize(user.name) === capitalize(userName) &&
          capitalize(user.surname) === capitalize(surName)
        )
    );

    if (users.length < initialLength) {
      saveUsersToStorage(users);
      alert("Utente rimosso con successo!");
      print();
    } else {
      alert("Utente non trovato.");
      return;
    }

    userForm.reset();
  } else {
    alert("Compila entrambi i campi per rimuovere un utente.");
    return;
  }
});
*/

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
    nameCell.textContent = capitalize(user.name);
    row.appendChild(nameCell);

    const surnameCell = document.createElement("td");
    surnameCell.textContent = capitalize(user.surname);
    row.appendChild(surnameCell);

    const col4 = document.createElement("td");
    col4.innerHTML = '<i class="bi bi-pencil-square"></i>';
    col4.addEventListener("click", () => editUser(index, row));
    row.appendChild(col4);

    const col5 = document.createElement("td");
    col5.innerHTML = '<i class="bi bi-trash3"></i>';
    col5.addEventListener("click", () => deleteUser(user, row));
    row.appendChild(col5);

    tableBody.appendChild(row);
  });
}

function capitalize(str) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function deleteUser(user, row) {
  let users = getUsersFromStorage();

  // trovare l'indice all'interno dell'array users
  const userIndex = users.findIndex((u) => u.id === user.id);

  // SE esiste bisogna rimuoverlo dall'array e dalla tabella
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    saveUsersToStorage(users);
    row.remove();
    alert(`User ${user.name} ${user.surname} deleted.`);
  } else {
    alert("Utente non trovato!");
  }
}

function editUser(index, row) {
  const users = getUsersFromStorage();

  const user = users[index];

  const nameCell = row.cells[1];
  const surnameCell = row.cells[2];
  const col4 = row.cells[3];

  const nameInput = document.createElement("input");
  nameInput.value = user.name;

  const surnameInput = document.createElement("input");
  surnameInput.value = user.surname;

  nameCell.innerHTML = "";
  surnameCell.innerHTML = "";
  col4.innerHTML = '<i class="bi bi-floppy" id="save"></i>';

  nameCell.appendChild(nameInput);
  surnameCell.appendChild(surnameInput);

  col4.addEventListener("click", () =>
    saveChanges(index, nameInput, surnameInput, row)
  );
}

function saveChanges(index, nameInput, surnameInput, row) {
  const newName = nameInput.value.trim();
  const newSurname = surnameInput.value.trim();

  if (!newName || !newSurname) {
    alert("Compila entrambe i campi!");
    return;
  }


  const users = getUsersFromStorage();
  users[index].name = newName;
  users[index].surname = newSurname;
  saveUsersToStorage(users);
  alert("Utente modificato con successo!");
  print();
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
