// PROFIEL UPLOAD
document.getElementById('btn_profiel').addEventListener('click', addProfiel);

async function addProfiel() {
    let voornaam = document.getElementById('voornaam').value;
    let tussenvoegsel = document.getElementById('tussenvoegsel').value;
    let achternaam = document.getElementById('achternaam').value;
    let email = document.getElementById('email').value;
    let wachtwoord = document.getElementById('wachtwoord').value;
    let telefoonNummer = document.getElementById('telnummer').value;
    let leeftijd = document.getElementById('leeftijd').value;
    let persoon_info = document.getElementById('eigenTekst').value;

    let profielFoto = document.getElementById('profielFoto').value;

    let instagram = document.getElementById('Instagram').value;
    let twitter = document.getElementById('Twitter').value;
    let linkedIn = document.getElementById('LinkedIn').value;
    let facebook = document.getElementById('Facebook').value;
    let whatsapp = document.getElementById('Whatsapp').value;
    let telegram = document.getElementById('Telegram').value;

    let account_id;

    // EMAIL EN WACHTWOORD
    await FYSCloud.API.queryDatabase(
        "INSERT INTO account (email, wachtwoord) VALUES (?, ?)", // Voegt de persoon toe aan de database
        [email, wachtwoord]
    ).then(function (data) {
        console.log(data);
        account_id = Object.valueOf(data[3]);
        console.log("Het account id is: " + account_id);
    }).catch(function (reason) {
        console.log(reason);
    });

    // STANDAARD INFO
    await FYSCloud.API.queryDatabase(
        "INSERT INTO persoon (account_id, voornaam, tussenvoegsel, achternaam, telefoon, leeftijd, foto, persoon_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [account_id, voornaam, tussenvoegsel, achternaam, telefoonNummer, leeftijd, profielFoto, persoon_info]
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });

    //SOCIALMEDIA
    await FYSCloud.API.queryDatabase(
        "INSERT INTO sociale_media (instagram, twitter, linkedin, facebook, whatsapp, telegram) VALUES (?, ?, ?, ?, ?, ?)",
        [instagram, twitter, linkedIn, facebook, whatsapp, telegram]
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
}