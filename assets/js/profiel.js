document.addEventListener('DOMContentLoaded', () => {


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

        // EMAIL EN WACHTWOORD
        await FYSCloud.API.queryDatabase(
            "INSERT INTO Account (email, wachtwoord) VALUES (?, ?)", // Voegt de persoon toe aan de database
            [email, wachtwoord]
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
        });

        let account_id = FYSCloud.API.queryDatabase(
            "SELECT * FROM Account WHERE (email) LIKE (?) ",
            [email]
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
        });

        // STANDAARD INFO
        await FYSCloud.API.queryDatabase(
            "INSERT INTO Persoon (account_id, voornaam, tussenvoegsel, achternaam, telefoon, leeftijd, persoon_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [account_id, voornaam, tussenvoegsel, achternaam, telefoonNummer, leeftijd, persoon_info]
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
        });

        //SOCIALMEDIA
        await FYSCloud.API.queryDatabase(
            "INSERT INTO SocialMedia (instagram, twitter, linkedin, facebook, whatsapp, telegram) VALUES (?, ?, ?, ?, ?, ?)",
            [instagram, twitter, linkedIn, facebook, whatsapp, telegram]
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
        });
    }

    // Profielfoto upload
    /**
     * WERKT OPEENS NIET MEER
     **/
    async function handleImageUpload() {

        let image = document.getElementById("profielFoto").files[0];

        let reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("display-image").src = e.target.result;
        }

        reader.readAsDataURL(image);
    }
});