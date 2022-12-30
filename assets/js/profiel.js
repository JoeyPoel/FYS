document.addEventListener('DOMContentLoaded', () => {

    FYSCloud.API.configure({
        url: "https://api.fys.cloud",
        apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
        database: "fys_is101_4_live",
        environment: "mockup"
    });

    const form = document.querySelector('#profiel-form');
    const imageInput = document.getElementById("fileUpload");
    const voornaam = document.querySelector('#voornaam');
    const tussenvoegsel = document.querySelector('#tussenvoegsel');
    const achternaam = document.querySelector('#achternaam');
    const telefoonnummer = document.querySelector('#telefoonnummer');
    const interesse = document.querySelector('#interesse');
    const bestemming = document.querySelector('#bestemming');
    const geslacht = document.querySelector('#geslacht');
    const beginVakantie = document.querySelector('#beginVakantie');
    const eindVakantie = document.querySelector('#eindVakantie');
    const geboortedatum = document.querySelector('#geboortedatum');
    const bio = document.querySelector('#bio');

    form.addEventListener('submit', (event) => {
        validateForm();
        console.log(isFormValid());
        if (isFormValid() == true) {
            form.submit();
            //insertData();
        } else {
            event.preventDefault();
        }
    });

    function isFormValid() {
        const inputContainers = form.querySelectorAll('.input-group');
        let result = true;
        inputContainers.forEach((container) => {
            if (container.classList.contains('error')) {
                result = false;
            }
        });
        return result;
    }

    function validateForm() {
        // Voornaam
        if (voornaam.value.trim() == '') {
            setError(voornaam, 'Voornaam kan niet leeg zijn');
        } else {
            setSuccess(voornaam);
        }
        // Tussenvoegsel
        if (tussenvoegsel.value.trim().length > 15) {
            setError(tussenvoegsel, 'Tussenvoegsel kan niet heel lang zijn');
        } else {
            setSuccess(tussenvoegsel);
        }
        // Achternaam
        if (achternaam.value.trim() == '') {
            setError(achternaam, 'Achternaam kan niet leeg zijn');
        } else {
            setSuccess(achternaam);
        }
        // Telefoonnummer
        if (telefoonnummer.value.trim() == '') {
            setError(telefoonnummer, 'Telefoonnummer kan niet leeg zijn');
        } else if (telefoonnummer.value.trim().length > 15) {
            setError(telefoonnummer, 'Telefoonnummer kan niet langer dan 15 karakters zijn');
        } else {
            setSuccess(telefoonnummer);
        }
        // Interesse
        if (interesse.value.trim() == 'interesseDefaultNone') {
            setError(interesse, 'Kies een interesse');
        } else {
            setSuccess(interesse);
        }
        // Bestemming
        if (bestemming.value.trim() == 'bestemmingDefaultNone') {
            setError(bestemming, 'Kies je bestemming');
        } else {
            setSuccess(bestemming);
        }
        // Geslacht
        if (geslacht.value.trim() == 'geslachtDefaultNone') {
            setError(geslacht, 'Kies je geslacht');
        } else {
            setSuccess(geslacht);
        }
        // Begin vakantie
        if (beginVakantie.value.trim() == '') {
            setError(beginVakantie, 'Kies de startdatum voor je vakantie');
        } else {
            setSuccess(beginVakantie);
        }
        // Eind vakantie
        if (eindVakantie.value.trim() == '') {
            setError(eindVakantie, 'Kies de einddatum voor je vakantie');
        } else {
            setSuccess(eindVakantie);
        }
        // Geboortedatum
        if (geboortedatum.value.trim() == '') {
            setError(geboortedatum, 'Kies je geboortedatum');
        } else {
            setSuccess(geboortedatum);
        }
        // Bio
        if (bio.value.trim() == '') {
            setError(bio, 'Vul informatie over jezelf in');
        } else {
            setSuccess(bio);
        }
    }

    function setError(element, errorMessage) {
        const parent = element.parentElement;
        if (parent.classList.contains('success')) {
            parent.classList.remove('success');
        }
        parent.classList.add('error');
        const paragraph = parent.querySelector('p');
        paragraph.textContent = errorMessage;
    }

    function setSuccess(element) {
        const parent = element.parentElement;
        if (parent.classList.contains('error')) {
            parent.classList.remove('error');
        }
        parent.classList.add('success');
    }

    // Function with SQL that sends data to the database
    async function insertData() {
        try {
            const data = await FYSCloud.API.queryDatabase(
                "INSERT INTO account(gebruikersnaam, email, wachtwoord) VALUES(?, ?, ?)",
                [usernameInput.value, emailInput.value, passwordInput.value]
            );
            console.log(data);
            return data;
        } catch (error) {
            return null;
        }
    }

    /* form.addEventListener('submit', async (event) => {
        console.log("Start transaction");
        // Upload file
        await FYSCloud.Utils
            .getDataUrl(document.querySelector("#fileUpload"))
            .then(function(data) {
                FYSCloud.API.uploadFile(
                    data.fileName,
                    data.url, true // data.url under ~500kb will work otherwise error due to slow network traffic (in API)
                ).then(function(data) {
                    console.log(data);
                    console.log("Succes!");
                }).catch(function(reason) {
                    console.log(reason);
                    console.log("Error!");
                });
            }).catch(function(reason) {
                console.log(reason);
                console.log("Failed! No file selected.");
            });

        await FYSCloud.Utils.fetchBlob(document.querySelector("#fileUpload")).then(
            (result) => {
                console.log("getimage:")
                console.log(result);
            }
        )
    }); */
    // Show image
    imageInput.addEventListener('change', (event) => {
        FYSCloud.Utils
            .getDataUrl("#fileUpload")
            .then(function(data) {
                if(data.isImage) {
                    document.getElementById("imagePreview").src = data.url;
                }
            }).catch(function(reason) {
            console.log(reason);
        });
    });
});

// Oud profiel
/* document.addEventListener('DOMContentLoaded', () => {
    // PROFIEL UPLOAD
    document.getElementById('btn-profiel').onclick= async function addProfiel(){
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

                // GESLACHT
                let geslacht;
                let checkboxvalue = document.getElementById("dot-1");
                if (checkboxvalue.checked == true){
                    geslacht = ("Man")
                } else{
                    checkboxvalue = document.getElementById("dot-2");
                    if (checkboxvalue.checked == true){
                        geslacht = ("Vrouw")
                    } else{
                        checkboxvalue = document.getElementById("dot-3");
                        if (checkboxvalue.checked == true){
                            geslacht = ("Anders")
                        } else{
                            geslacht = "niet gegeven"
                        }
                    }
                }

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
                // Switcht de values van vakantie tot en van als de waardes niet kloppen
                if(vakantieVan > vakantieTot){
                    let tussenstap = vakantieVan;
                    vakantieVan = vakantieTot;
                    vakantieTot = tussenstap;
                }

                let bestemming = document.getElementById('bestemming').value;

                // INTERESSES
                checkboxvalue = document.getElementById("Zwemmen");
                let zwemmen;
                if (checkboxvalue.checked == true){
                    zwemmen = 1
                } else{
                    zwemmen = 0
                }

                checkboxvalue = document.getElementById("Fietsen");
                let fietsen;
                if (checkboxvalue.checked == true){
                    fietsen = 1
                } else{
                    fietsen = 0
                }

                checkboxvalue = document.getElementById("Hardlopen");
                let hardlopen;
                if (checkboxvalue.checked == true){
                    hardlopen = 1
                } else{
                    hardlopen = 0
                }

                checkboxvalue = document.getElementById("Klimmen");
                let klimmen;
                if (checkboxvalue.checked == true){
                    klimmen = 1
                } else{
                    klimmen = 0
                }

                checkboxvalue = document.getElementById("MuseaBezoeken");
                let museaBezoeken;
                if (checkboxvalue.checked == true){
                    museaBezoeken = 1
                } else{
                    museaBezoeken = 0
                }

                checkboxvalue = document.getElementById("Culturen");
                let culturen ;
                if (checkboxvalue.checked == true){
                    culturen = 1
                } else{
                    culturen= 0
                }

                checkboxvalue = document.getElementById("Skiën");
                let skiën;
                if (checkboxvalue.checked == true){
                    skiën = 1
                } else{
                    skiën = 0
                }

                checkboxvalue = document.getElementById("Kunst");
                let kunst;
                if (checkboxvalue.checked == true){
                    kunst = 1
                } else{
                    kunst = 0
                }

                checkboxvalue = document.getElementById("Grotten");
                let grotten;
                if (checkboxvalue.checked == true){
                    grotten = 1
                } else{
                    grotten = 0
                }

                checkboxvalue = document.getElementById("Geschiedenis");
                let geschiedenis;
                if (checkboxvalue.checked == true){
                    geschiedenis = 1
                } else{
                    geschiedenis = 0
                }

                // SOORT VAKANTIE
                checkboxvalue = document.getElementById("Cruise");
                let cruise;
                if (checkboxvalue.checked == true){
                    cruise = 1
                } else{
                    cruise = 0
                }

                checkboxvalue = document.getElementById("Fly-DriveVakantie");
                let flyDriveVakantie;
                if (checkboxvalue.checked == true){
                    flyDriveVakantie = 1
                } else{
                    flyDriveVakantie = 0
                }

                checkboxvalue = document.getElementById("Formule1");
                let formule1;
                if (checkboxvalue.checked == true){
                    formule1 = 1
                } else{
                    formule1 = 0
                }

                checkboxvalue = document.getElementById("Rondreis");
                let rondreis;
                if (checkboxvalue.checked == true){
                    rondreis = 1
                } else{
                    rondreis = 0
                }

                checkboxvalue = document.getElementById("Stedentrip");
                let stedentrip;
                if (checkboxvalue.checked == true){
                    stedentrip = 1
                } else{
                    stedentrip = 0
                }

                checkboxvalue = document.getElementById("Skivakantie");
                let skivakantie;
                if (checkboxvalue.checked == true){
                    skivakantie = 1
                } else{
                    skivakantie = 0
                }

                checkboxvalue = document.getElementById("Zonvakantie");
                let zonvakantie;
                if (checkboxvalue.checked == true){
                    zonvakantie = 1
                } else{
                    zonvakantie = 0
                }

                // EIGEN TEKST
                let eigenTekst = document.getElementById('eigenTekst').value;

                await FYSCloud.API.queryDatabase(
                    "SELECT idAccount FROM Persoon where idAccount = ?",
                    [userId]
                ).then(function (data) {
                    console.log(data);
                    if (data[0].idAccount == userId){
                        updateProfiel();
                    } else{
                        insertProfiel();
                    }
                }).catch(function (reason) {
                    console.log(reason);
                });

                async function updateProfiel(){
                    // PERSOONLIJKE GEGEVENS
                    await FYSCloud.API.queryDatabase(
                        "UPDATE Persoon SET voornaam = ?, tussenvoegsel = ?, achternaam = ?, geboortedatum = ?, begin_vakantie = ?, eind_vakantie = ?, eigen_tekst = ?, bestemming = ?, telefoon_nummer = ?, budget = ?, leeftijdsgrens_partner = ?, geslacht = ? WHERE idAccount = ?",
                        [voornaam, tussenvoegsel, achternaam, geboortedatum, vakantieVan, vakantieTot, eigenTekst, bestemming, telefoonNummer, budget, leeftijdsgrens, geslacht, userId ]
                    ).then(function (data) {
                        console.log(data);
                    }).catch(function (reason) {
                        console.log(reason);
                    });

                    // INTERESSES
                    await FYSCloud.API.queryDatabase(
                        "UPDATE interesses SET zwemmen = ?, fietsen = ?, hardlopen = ?, klimmen = ?, musea_bezoeken = ?, culturen = ?, skiën = ?, kunst = ?, grotten = ?, geschiedenis = ? WHERE idAccount = ?",
                        [zwemmen, fietsen, hardlopen, klimmen, museaBezoeken, culturen, skiën, kunst, grotten, geschiedenis, userId ]
                    ).then(function (data) {
                        console.log(data);
                    }).catch(function (reason) {
                        console.log(reason);
                    });

                    // SOCIALMEDIA
                    await FYSCloud.API.queryDatabase(
                        "UPDATE SocialMedia SET instagram = ?, twitter = ?, linkedin = ?, facebook = ?, whatsapp = ?, telegram = ? WHERE idAccount = ?",
                        [instagram, twitter, linkedIn, facebook, whatsapp, telegram, userId]
                    ).then(function (data) {
                        console.log(data);
                    }).catch(function (reason) {
                        console.log(reason);
                    });

                    // SOORT VAKANTIE
                    await FYSCloud.API.queryDatabase(
                        "UPDATE SoortVakantie SET cruise = ?, fly_drive = ?, formule1 = ?, rondreis = ?, stedentrip = ?, ski_vakantie = ?, zon_vakantie = ? WHERE idAccount = ?",
                        [cruise, flyDriveVakantie, formule1, rondreis, stedentrip, skivakantie, zonvakantie, userId]
                    ).then(function (data) {
                        console.log(data);
                    }).catch(function (reason) {
                        console.log(reason);
                    });
                }

                async function insertProfiel(){
                    // PERSOONLIJKE GEGEVENS
                    await FYSCloud.API.queryDatabase(
                        "INSERT INTO Persoon (idAccount, voornaam, tussenvoegsel, achternaam, geboortedatum, begin_vakantie, eind_vakantie, eigen_tekst, bestemming, telefoon_nummer, budget, leeftijdsgrens_partner, geslacht) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [userId, voornaam, tussenvoegsel, achternaam, geboortedatum, vakantieVan, vakantieTot, eigenTekst, bestemming, telefoonNummer, budget, leeftijdsgrens, geslacht]
                    ).then(function (data) {
                        console.log(data);
                    }).catch(function (reason) {
                        console.log(reason);
                    });

                    // INTERESSES
                    await FYSCloud.API.queryDatabase(
                        "INSERT INTO interesses (zwemmen, fietsen, hardlopen, musea_bezoeken, culturen, skiën, kunst, grotten, geschiedenis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [zwemmen, fietsen, hardlopen, klimmen, museaBezoeken, culturen, skiën, kunst, grotten, geschiedenis, userId ]
                    ).then(function (data) {
                        console.log(data);
                    }).catch(function (reason) {
                        console.log(reason);
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
                        "INSERT INTO soortvakantie (idAccount, cruise, fly_drive, formule1, rondreis, stedentrip, ski_vakantie, zon_vakantie) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        [userId, cruise, flyDriveVakantie, formule1, rondreis, stedentrip, skivakantie, zonvakantie]
                    ).then(function (data) {
                        console.log(data);
                    }).catch(function (reason) {
                        console.log(reason);
                    });
                }
            } catch (error) { // ALS IETS FOUT GAAT
                return null;
            }
        }

        // Zorgt ervoor dat dit element geshowed wordt wanneer je je aanpassingen doet om te valideren dat je het echt wilt
        let x = document.getElementById("weetJeHetZeker");
        if (x.style.display === "flex") {
            x.style.display = "flex";
        } else {
            x.style.display = "flex";
        }
    }
}); */