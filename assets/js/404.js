FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_test",
    environment: "mockup"
});
/*
let data = await getData();
document.getElementById("div-test").innerText = data[1].email;
makeDiv("Hoi Joey");makeDiv("heeeey");

async function getData() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT * FROM account"
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
    makeDiv(data[i].email);
} */

// Form testing
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

const voornaam = document.getElementById("voornaam");
const tussenvoegsel = document.getElementById("tussenvoegsel");
const achternaam = document.getElementById("achternaam");

form.addEventListener("submit", (e) => {
    let messages = [];
    if (voornaam.value === '' || voornaam.value == null) {
        messages.push("Voornaam is verplicht");
    }

    if (achternaam.value === '' || achternaam.value == null) {
        messages.push("Achternaam is verplicht");
    }

    if (messages.length > 0) {
        e.preventDefault() // prevent page refreshing to show the error
        errorElement.innerHTML = messages.join(", ");
    }

    if (messages.length == 0) {
        try {
            const data = FYSCloud.API.queryDatabase(
                "INSERT INTO persoon(voornaam, tussenvoegsel, achternaam) VALUES(?, ?, ?)",
                [voornaam.value, tussenvoegsel.value, achternaam.value]
            );
            console.log(data);
            return data;
        } catch (error) {
            return null;
        }
    }
});
/*
window.addEventListener("load", addListeners);

function addListeners() {
    document.getElementById("submitBtn").addEventListener("click", insertData);
}

async function insertData() {
    let voornaam;
    let tussenvoegsel;
    let achternaam;
    voornaam = document.getElementById("voornaam").value;
    tussenvoegsel = document.getElementById("tussenvoegsel").value;
    achternaam = document.getElementById("achternaam").value;

    document.getElementById("second").innerHTML = "HET WERKT!!!!";
    console.log(voornaam);
    console.log(tussenvoegsel);
    console.log(achternaam);

    try {
        const data = await FYSCloud.API.queryDatabase(
            "INSERT INTO persoon(voornaam, tussenvoegsel, achternaam) VALUES(?, ?, ?)",
            [voornaam, tussenvoegsel, achternaam]
        );
        console.log(data);
        return data;
    } catch (error) {
        return null;
    }
}*/