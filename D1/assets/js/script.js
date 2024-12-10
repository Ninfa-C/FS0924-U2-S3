class User {
  constructor(_firstName, _lastName, _age, _location) {
    this.name = _firstName;
    this.surname = _lastName;
    this.age = _age;
    this.location = _location;
  }

  compareAge(otherUser) {
    if (this.age > otherUser.age) {
      return `${this.name} ${this.surname} è più vecchio di ${otherUser.name} ${otherUser.surname} `;
    } else if (this.age < otherUser.age) {
      return `${this.name} ${this.surname} è più giovane di ${otherUser.name} ${otherUser.surname} `;
    } else {
      return `${this.name} ${this.surname} e ${otherUser.name} ${otherUser.surname} hanno la stessa età.`;
    }
  }
}

const user1 = new User("Francesco", "Rossi", 30, "Genova");
const user2 = new User("Davide", "Canepa", 25, "Savona");
const user3 = new User("Matteo", "Mariano", 30, "Torino");

console.log(user1.compareAge(user2));
console.log(user2.compareAge(user3));
console.log(user1.compareAge(user3));

const btnAdd = document.getElementById("invio"); //intercettare l bottone di invio
const pets = []; //creare array vuoto che verrà riempito dai dati nel form
const ownersList = [];

//creaiamo la superclasse
class Owner {
  constructor(_ownerName) {
    this.ownerName = _ownerName;
  }
}
//creaiamo l'extend con i dati successivi
class Pet extends Owner {
  constructor(_ownerName, _petName, _specie, _race) {
    super(_ownerName);
    this.petName = _petName;
    this.specie = _specie;
    this.race = _race;
  }
}

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  // Intercettazione valori dal form
  const ownerName = document.getElementById("ownerName").value;
  const petName = document.getElementById("petName").value;
  const specie = document.getElementById("petSpecie").value;
  const race = document.getElementById("petRace").value;

  // Creazione oggetto Pet, per poter pushare un oggetto nell'array e non i singoli volori come proprietà singoli.
  let mypet;
  mypet = new Pet(ownerName, petName, specie, race);
  pets.push(mypet)
  localStorage.setItem('pets', JSON.stringify(pets))

console.log(pets)

  // Verifica duplicati
  if (!ownersList.includes(ownerName)) {
    ownersList.push(ownerName); // Aggiunge il nuovo proprietario alla lista
  }

  const petTable = document.getElementById("petTable");
  petTable.innerHTML = "";

  pets.forEach((pet, index) => {
    const row = document.createElement("tr");

    const column1 = document.createElement("td");
    column1.innerText = index + 1; // Numero riga
    const column2 = document.createElement("td");
    column2.innerText = pet.ownerName; // Nome del proprietario
    const column3 = document.createElement("td");
    column3.innerText = pet.petName; // Nome del pet
    const column4 = document.createElement("td");
    column4.innerText = pet.specie; // Specie
    const column5 = document.createElement("td");
    column5.innerText = pet.race; // Razza

    const duplicate = pets.filter(p => p.ownerName.toLowerCase() === pet.ownerName.toLowerCase()).length > 1;
    const column6 = document.createElement("td");
    column6.innerText = duplicate ? "True" : "False";

    // Aggiungi le colonne alla riga
    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);
    row.appendChild(column4);
    row.appendChild(column5);
    row.appendChild(column6);

    // Aggiungi la riga alla tabella
    petTable.appendChild(row);
  });

  // Reset del form
  petForm.reset();
});
