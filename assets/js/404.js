FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_test",
    environment: "mockup"
});

let data = await getData();
//document.getElementById("div-test").innerText = data[0].idAccount;

async function getData() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `fys_is101_4_live`.`persoon` WHERE bestemming='Duitsland';"
        );
        return data;
    } catch (error) {
        return null;
    }
}

// for loop with the output
for (let i = 0; i < data.length; i++) {
    makeDivVoornaam(data[i].voornaam);
    makeDivTussenvoegsel(data[i].tussenvoegsel);
    makeDivAchternaam(data[i].achternaam);
    makeDivGeslacht(data[i].geslacht);
    makeDivGeboortedatum(data[i].geboortedatum);
    makeDivInteresse(data[i].interesse);
    makeDivBestemming(data[i].bestemming);
    makeDivBeginVakantie(data[i].beginVakantie);
    makeDivEindVakantie(data[i].eindVakantie);
    makeDivBio(data[i].bio);
    /* for (const property in data[i]) {
        console.log(`${property}: ${data[i][property]}`);
        let div = document.createElement("div"); // creates div element
        document.getElementById("div-voornaam").appendChild(div); // plakt div element aan test-div element
        div.innerText = data[i][property];
        div.className = "divPersoonOpmaak";
    } */
}

console.log(data);
console.log(data.values(data)[0]); // {one: '1'} -> returns '1'
console.log(data.keys(data)); // {one: '1'} -> returns 'one'

function makeDivVoornaam(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-voornaam").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivTussenvoegsel(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-tussenvoegsel").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivAchternaam(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-achternaam").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivGeslacht(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-geslacht").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivGeboortedatum(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-geboortedatum").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivInteresse(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-interesse").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivBestemming(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-bestemming").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivBeginVakantie(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-beginVakantie").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivEindVakantie(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-eindVakantie").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

function makeDivBio(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-bio").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

/* function makeDiv(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-test").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

for (let i = 0; i < data.length; i++) {
    makeDiv(data[i].voornaam);
} */

/* Joey login.html oud
<main class="main-logIn">
    <div class="container-1-Inlog">
        <div class="inlogBox">
            <input type="checkbox" class="button_aanmelden" id="chk">
            <div class="aanmelden">
                <label class="label_aanmelden" for="chk">Registreren</label>
                <form class="form_aanmelden">
                    <input class="input_aanmelden" id="email_aanmelden" type="email" placeholder="Email" required>
                    <input class="input_aanmelden" id="wachtwoord_aanmelden" type="password" placeholder="Wachtwoord"
                           required>
                    <button class="button_aanmelden">Registreren</button>
                    <p>
                        Al een account,
                        <label class="smalltext" for="chk">klik hier.</label>
                    </p>
                </form>
            </div>
            <div class="inloggen">
                <label class="label_inloggen" for="chk">Log in</label>
                <form class="form_inloggen">
                    <input class="input_inloggen" id="email_inloggen" type="email" placeholder="Email" required>
                    <input class="input_inloggen" id="wachtwoord_inloggen" type="password" placeholder="Wachtwoord"
                           required>
                    <button class="button_inloggen">Inloggen</button>
                    <p class="nogGeenAccount">
                        Nog geen account,
                        <label class="smalltext2" for="chk">klik hier.</label>
                    </p>
                </form>
            </div>
        </div>
    </div>
</main>

// TEST DATA
let wachtwoord = "joey";
let email = "hoi";

// SQL LIKE mag maar 1 waarde hebben, dus dit is fout
// log in
async function inloggen(){
    FYSCloud.API.queryDatabase(
        "SELECT * FROM account WHERE (email, wachtwoord) LIKE (?, ?) ", // Vraagt of email in de database zit
        [email, wachtwoord]                                             // en of het wachtwoord bij de email hoort
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
}

// Aanmelden
async function aanmelden(){
    await FYSCloud.API.queryDatabase(
        "SELECT * FROM account WHERE email NOT LIKE ? ", // Vraagt of email NOG NIET in de database zit
        email
    ).then(function (data) {
        insertAccount();
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
}

async function insertAccount() {
    await FYSCloud.API.queryDatabase(
        "INSERT INTO account (email, wachtwoord) VALUES (?, ?)", // Voegt de persoon toe aan de database
        [email, wachtwoord]
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
} */