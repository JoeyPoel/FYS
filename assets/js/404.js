FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_test",
    environment: "mockup"
});

const form = document.getElementById("form");
const errorElement = document.getElementById("error");

const voornaam = document.getElementById("voornaam");
const tussenvoegsel = document.getElementById("tussenvoegsel");
const achternaam = document.getElementById("achternaam");

document.getElementById("form").addEventListener("submit", insertData);

async function insertData() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "INSERT INTO persoon(voornaam, tussenvoegsel, achternaam) VALUES(?, ?, ?)",
            [voornaam.value, tussenvoegsel.value, achternaam.value]
        );
        console.log(data);
        return data;
    } catch (error) {
        return null;
    }
}

/* let data = await getData();
document.getElementById("div-test").innerText = data[0].id;

async function getData() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT id FROM persoon WHERE id = (SELECT MAX(id) FROM persoon)"
        );
        return data;
    } catch (error) {
        return null;
    }
}

function makeDiv(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-test").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

for (let i = 0; i < data.length; i++) {
    makeDiv(data[i].id);
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