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