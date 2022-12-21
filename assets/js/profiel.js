document.addEventListener('DOMContentLoaded',
    () => {


        // PROFIEL UPLOAD
        document.getElementById('btn_profiel').addEventListener('click', addProfiel);

        async function addProfiel() {

            // ACCOUNT ID
            // let account_id =
            // PROFIEL FOTO
            let profielFoto = document.getElementById('profielFoto').value;

            // PERSOONLIJKE GEGEVENS
            let voornaam = document.getElementById('voornaam').value;
            let tussenvoegsel = document.getElementById('tussenvoegsel').value;
            let achternaam = document.getElementById('achternaam').value;
            let telefoonNummer = document.getElementById('telnummer').value;
            let leeftijd = document.getElementById('leeftijd').value;
            let persoon_info = document.getElementById('eigenTekst').value;

            // GESLACHT
            if (document.getElementById('dot-1').checked) {
                rate_value = document.getElementById('dot-1').value;
            }
            if (document.getElementById('dot-2').checked) {
                rate_value = document.getElementById('dot-2').value;
            }
            if (document.getElementById('dot-3').checked) {
                rate_value = document.getElementById('dot-3').value;
            }

            // SOCIAL MEDIA
            let instagram = document.getElementById('Instagram').value;
            let twitter = document.getElementById('Twitter').value;
            let linkedIn = document.getElementById('LinkedIn').value;
            let facebook = document.getElementById('Facebook').value;
            let whatsapp = document.getElementById('Whatsapp').value;
            let telegram = document.getElementById('Telegram').value;

            // SOCIAL MEDIA
            let budget = document.getElementById('Instagram').value;
            let leeftijdsgrens = document.getElementById('Twitter').value;
            let vakantieVan = document.getElementById('LinkedIn').value;
            let vakantieTot = document.getElementById('Facebook').value;

            // EIGEN TEKST
            let eigenTekst = document.getElementById('Whatsapp').value;

            // PERSOONLIJKE GEGEVENS
            await FYSCloud.API.queryDatabase(
                "INSERT INTO Persoon (account_id, voornaam, tussenvoegsel, achternaam, telefoon, leeftijd, persoon_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [account_id, voornaam, tussenvoegsel, achternaam, telefoonNummer, leeftijd, persoon_info]
            ).then(function (data) {
                console.log(data);
            }).catch(function (reason) {
                console.log(reason);
            });

            // SOCIALMEDIA
            await FYSCloud.API.queryDatabase(
                "INSERT INTO SocialMedia (instagram, twitter, linkedin, facebook, whatsapp, telegram) VALUES (?, ?, ?, ?, ?, ?)",
                [instagram, twitter, linkedIn, facebook, whatsapp, telegram]
            ).then(function (data) {
                console.log(data);
            }).catch(function (reason) {
                console.log(reason);
            });

            await FYSCloud.API.queryDatabase(
                "INSERT INTO SocialMedia (instagram, twitter, linkedin, facebook, whatsapp, telegram) VALUES (?, ?, ?, ?, ?, ?)",
                [instagram, twitter, linkedIn, facebook, whatsapp, telegram]
            ).then(function (data) {
                console.log(data);
            }).catch(function (reason) {
                console.log(reason);
            });
        }
    });