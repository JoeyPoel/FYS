document.addEventListener('DOMContentLoaded', () => {

    FYSCloud.API.configure({
        url: "https://api.fys.cloud",
        apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
        database: "fys_is101_4_live",
        environment: "mockup"
    });

    let object = FYSCloud.Session.get();
    //console.log(object);
    //console.log(Object.values(object)[0]); // {one: '1'} -> returns '1'
    //console.log(Object.keys(object)); // {one: '1'} -> returns 'one'

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

    form.addEventListener('submit', async (event) => {
        validateForm();
        console.log(isFormValid());
        if (isFormValid() == true) {
            event.preventDefault();
            //form.submit();
            //insertData();
            // Upload file
            await FYSCloud.Utils
                .getDataUrl(document.querySelector("#fileUpload"))
                .then(function (data) {
                    FYSCloud.API.uploadFile(
                        data.fileName,
                        data.url, true // data.url under ~500kb will work otherwise error due to slow network traffic (in API)
                    ).then(function (data) {
                        console.log(data);
                        const insertData = FYSCloud.API.queryDatabase(
                            "INSERT INTO `fys_is101_4_live`.`Persoon` VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);",
                            [Object.values(object)[0], voornaam.value, tussenvoegsel.value, achternaam.value, bio.value, geboortedatum.value, interesse.value, bestemming.value, beginVakantie.value, eindVakantie.value, geslacht.value, data, telefoonnummer.value]
                        );
                        //console.log(insertData);
                        console.log("Succes!");
                        form.submit();
                    }).catch(function (reason) {
                        console.log(reason);
                        console.log("Error!");
                    });
                }).catch(function (reason) {
                    console.log(reason);
                    console.log("Failed! No file selected.");
                });

            await FYSCloud.Utils.fetchBlob(document.querySelector("#fileUpload")).then(
                (result) => {
                    console.log("getimage:")
                    console.log(result);
                }
            )
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
        // Profielfoto
        if (imageInput.value.trim() == '') {
            setError(imageInput, 'Kies een foto');
        } else {
            setSuccess(imageInput);
        }
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

    /* // Function with SQL that sends data to the database
    async function insertData() {
        try {
            const data = await FYSCloud.API.queryDatabase(
                "INSERT INTO `fys_is101_4_live`.`Persoon` VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);",
                [Object.values(object)[0], voornaam.value, tussenvoegsel.value, achternaam.value, bio.value, geboortedatum.value, interesse.value, bestemming.value, beginVakantie.value, eindVakantie.value, geslacht.value, imageInput.value, telefoonnummer.value]
            );
            console.log(data);
            return data;
        } catch (error) {
            return null;
        }
    } */

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
            .then(function (data) {
                if (data.isImage) {
                    document.getElementById("imagePreview").src = data.url;
                }
            }).catch(function (reason) {
            console.log(reason);
        });
    });
});