/*
FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_live",
    environment: "mockup"
});

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
window.addEventListener("load", addListeners);

function addListeners() {
    document.getElementById("submitBtn").addEventListener("click", formFunction);
}

function formFunction() {
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
}