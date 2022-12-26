document.addEventListener('DOMContentLoaded',
() => {


    // PROFIEL UPLOAD
    document.getElementById('btn_profiel').addEventListener('click', addProfiel);

    async function addProfiel() {

        // Zorgt er voor dat het profiel in de juiste id wordt ge insert

        await getData();
        async function getData() {
            let object = FYSCloud.Session.get();
            try {
                const data = await FYSCloud.API.queryDatabase(
                    "SELECT idAccount FROM account WHERE email=?;", // vraagt account id op
                    [Object.keys(object)]
                );

                let userId = data[0].idAccount; // account id
                console.log("De userId waar in de informatie wordt opgeslagen is: " + userId)

                // PROFIEL FOTO
                let profielFoto = document.getElementById('profielFoto').value;

                // PERSOONLIJKE GEGEVENS
                let voornaam = document.getElementById('voornaam').value;
                let tussenvoegsel = document.getElementById('tussenvoegsel').value;
                let achternaam = document.getElementById('achternaam').value;
                let telefoonNummer = document.getElementById('telnummer').value;
                let geboortedatum = document.getElementById('leeftijd').value;
                let persoon_info = document.getElementById('eigenTekst').value;

                // GESLACHT
                let man = document.getElementById("Skivakantie");
                let vrouw = document.getElementById("Skivakantie");
                let geefIkLieverNiet = document.getElementById("Skivakantie");

                // SOCIAL MEDIA
                let instagram = document.getElementById('Instagram').value;
                let twitter = document.getElementById('Twitter').value;
                let linkedIn = document.getElementById('LinkedIn').value;
                let facebook = document.getElementById('Facebook').value;
                let whatsapp = document.getElementById('Whatsapp').value;
                let telegram = document.getElementById('Telegram').value;

                // VAKANTIE
                let budget = document.getElementById('budget').value;
                let leeftijdsgrens = document.getElementById('leeftijdsgrens').value;
                let vakantieVan = document.getElementById('datumVan').value;
                let vakantieTot = document.getElementById('datumTot').value;
                let bestemming = document.getElementById('bestemming').value;


                // INTERESSES
                let zwemmen = document.getElementById("Zwemmen");
                let fietsen = document.getElementById("Fietsen");
                let hardlopen = document.getElementById("Hardlopen");
                let klimmen = document.getElementById("Klimmen");
                let museaBezoeken = document.getElementById("MuseaBezoeken");
                let culturen = document.getElementById("Culturen");
                let skiën = document.getElementById("Skiën");
                let kunst = document.getElementById("Kunst");
                let grotten = document.getElementById("Grotten");
                let geschiedenis = document.getElementById("Geschiedenis");

                // SOORT VAKANTIE
                let cruise = document.getElementById("Cruise");
                let flyDriveVakantie = document.getElementById("Fly-DriveVakantie");
                let formule1 = document.getElementById("Formule1");
                let rondreis = document.getElementById("Rondreis");
                let stedentrip = document.getElementById("Stedentrip");
                let skivakantie = document.getElementById("Skivakantie");
                let zonvakantie = document.getElementById("Zonvakantie");

                // EIGEN TEKST
                let eigenTekst = document.getElementById('eigenTekst').value;

                // PERSOONLIJKE GEGEVENS
                await FYSCloud.API.queryDatabase(
                    "INSERT INTO Persoon (idAccount, voornaam, tussenvoegsel, achternaam, geboortedatum, begin_vakantie, eind_vakantie, eigen_tekst, bestemming, telefoon_nummer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [userId, voornaam, tussenvoegsel, achternaam, geboortedatum, vakantieVan, vakantieTot, eigenTekst, bestemming, telefoonNummer]
                ).then(function (data) {
                    console.log(data);
                }).catch(function (reason) {
                    console.log(reason);
                    console.log(zwemmen);
                });

                // SOCIALMEDIA
                await FYSCloud.API.queryDatabase(
                    "INSERT INTO SocialMedia (idAccount, instagram, twitter, linkedin, facebook, whatsapp, telegram) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [userId, instagram, twitter, linkedIn, facebook, whatsapp, telegram]
                ).then(function (data) {
                    console.log(data);
                }).catch(function (reason) {
                    console.log(reason);
                });

                // SOORT VAKANTIE
                await FYSCloud.API.queryDatabase(
                    "INSERT INTO SocialMedia (idAccount, cruise, fly_drive, formule1, rondreis, stedentrip, ski_vakantie, zon_vakantie) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [userId, cruise, flyDriveVakantie, formule1, rondreis, stedentrip, skivakantie, zonvakantie]
                ).then(function (data) {
                    console.log(data);
                }).catch(function (reason) {
                    console.log(reason);
                });


            } catch (error) { // ALS IETS FOUT GAAT
                return null;
            }
        }
        }
});