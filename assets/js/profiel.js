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

                    // GESLACHT
                    let geslacht;
                    let checkboxvalue = document.getElementById("dot-1");
                    if (checkboxvalue.checked == true){
                        geslacht = ("Man")
                    }
                    checkboxvalue = document.getElementById("dot-2");
                    if (checkboxvalue.checked == true){
                        geslacht = ("Vrouw")
                    }
                    checkboxvalue = document.getElementById("dot-3");
                    if (checkboxvalue.checked == true){
                        geslacht = ("Anders")
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
        }
    });

