document.addEventListener('DOMContentLoaded', () => {

    FYSCloud.API.configure({
        url: "https://api.fys.cloud",
        apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
        database: "fys_is101_4_live",
        environment: "mockup"
    });

    const form = document.querySelector('#login-register-form');
    const imageInput = document.getElementById("fileUpload");

      form.addEventListener('submit', async (event) => {
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
    });
    // Show image
    imageInput.addEventListener('change', (event) => {
        FYSCloud.Utils
            .getDataUrl("#fileUpload")
            .then(function(data) {
                if(data.isImage) {
                    document.getElementById("imagePreview").src = data.url;
                    console.log(data);
                    console.log(data.url);
                    console.log(data.fileName);
                    console.log(Object.values(data)); // {one: '1'} -> returns '1'
                    let promise = FYSCloud.API.listDirectory();
                    console.log(promise);
                    console.log("Success!");
                }
            }).catch(function(reason) {
            console.log(reason);
            console.log("Error!");
        });
    });
    // Show list/array with the file names
    let promise = FYSCloud.API.listDirectory();
    console.log(promise);
    promise.then(
        (result) => {
            console.log(result);
            //console.log(result[0]); // First index of array
        }
    );
    //FYSCloud.API.deleteFile("Bugatti.jpg");
    //console.log(FYSCloud.API.fileExists("Bugatti.jpg"));
    // Get URL
    // FYSCloud.Utils
    //     .getDataUrl("#fileUpload")
    //     .then(function(data) {
    //         console.log(data);
    //         console.log("Success!");
    //     })
    //     .catch(function(reason) {
    //         console.log(reason);
    //         console.log("Error!");
    //     });
});

FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_live",
    environment: "mockup"
});

let data = await getData();
//document.getElementById("div-test").innerText = data[0].idAccount;

async function getData() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT voornaam, tussenvoegsel, achternaam, bio, geboortedatum, interesse, " +
            "bestemming, beginVakantie, eindVakantie, geslacht, profielfoto FROM `fys_is101_4_live`.`persoon` " +
            "WHERE bestemming = 'Duitsland';"
        );
        return data;
    } catch (error) {
        return null;
    }
}

/* const parentDiv = document.querySelector(".container-1-404");

function createMatchList(data) {
    for (const buddy in data[0]) {
        console.log(buddy);
        const div = document.createElement("div"); // Create div
        const text = document.createElement("p"); // Create p
        text.innerHTML = buddy.geslacht;
        div.appendChild(text);

        console.log(buddy.geslacht);

        parentDiv.appendChild(div);
    }
}

createMatchList(data); */

/*
// for loop with the output
for (let i = 0; i < data.length; i++) {
    for (const property in data[i]) {
        //console.log(`${property}: ${data[i][property]}`);
        let div = document.createElement("li"); // creates div element
        document.getElementById("ul-persoon").appendChild(div); // plakt div element aan test-div element
        div.innerText = data[i][property];
        div.className = "divPersoonOpmaak";
    }
} */

data.forEach((element) => {
    let dtFormat = new Intl.DateTimeFormat('nl-NL');
    console.log(element.voornaam + ' ' + element.tussenvoegsel + ' ' + element.achternaam);

    let divOne = document.createElement("li");
    document.querySelector("#append-list-ul").appendChild(divOne);
    //divOne.innerText = element.voornaam + ' ' + element.tussenvoegsel + ' ' + element.achternaam;
    divOne.className = "append-list-ul";

    //let divTwo = document.createElement("p");
    //divOne.appendChild(divTwo);
    //divTwo.innerText = "test2";
    //divTwo.className = "divTwo";

    let divContainer = document.createElement("div");
    divOne.appendChild(divContainer);
    divContainer.className = "container";

    let divCard = document.createElement("div");
    divContainer.appendChild(divCard);
    divCard.className = "card";

    let imgProfile = document.createElement("img");
    divCard.appendChild(imgProfile);
    imgProfile.className = "profile-img";
    imgProfile.src = "https://mockup-is101-4.fys.cloud/uploads/" + element.profielfoto;
    imgProfile.alt = "User profile";

    let divCardInfo = document.createElement("div");
    divCard.appendChild(divCardInfo);
    divCardInfo.className = "card-info";

    let personName = document.createElement("h1");
    divCardInfo.appendChild(personName);
    personName.innerText = element.voornaam + ' ' + element.tussenvoegsel + ' ' + element.achternaam;

    let personBio = document.createElement("p");
    divCardInfo.appendChild(personBio);
    personBio.innerText = element.bio;

    let ul = document.createElement("ul");
    divCardInfo.appendChild(ul);

    let li = document.createElement("li");
    ul.appendChild(li);

    let iconImgLocation = document.createElement("img");
    li.appendChild(iconImgLocation);
    iconImgLocation.src = "img/icon/location.svg";
    iconImgLocation.alt = "Location";
    const textLocation = document.createTextNode(element.bestemming);
    li.appendChild(textLocation);

    let iconImgInterest = document.createElement("img");
    li.appendChild(iconImgInterest);
    iconImgInterest.src = "img/icon/interest.svg";
    iconImgInterest.alt = "Interest";
    const textInterest = document.createTextNode("Interesse " + element.interesse);
    li.appendChild(textInterest);

    let iconImgCalendar = document.createElement("img");
    li.appendChild(iconImgCalendar);
    iconImgCalendar.src = "img/icon/calendar.svg";
    iconImgCalendar.alt = "Calendar";
    let dateGB = new Date(element.geboortedatum);
    const textCalendar = document.createTextNode("Geboortedatum " + dtFormat.format(dateGB));
    li.appendChild(textCalendar);

    let iconImgGender = document.createElement("img");
    li.appendChild(iconImgGender);
    iconImgGender.src = "img/icon/gender.svg";
    iconImgGender.alt = "Gender";
    const textGender = document.createTextNode("Geslacht " + element.geslacht);
    li.appendChild(textGender);

    let iconImgDateFrom = document.createElement("img");
    li.appendChild(iconImgDateFrom);
    iconImgDateFrom.src = "img/icon/date-from.svg";
    iconImgDateFrom.alt = "Date from";
    let dateBV = new Date(element.beginVakantie);
    const textDateFrom = document.createTextNode("Datum van " + dtFormat.format(dateBV));
    li.appendChild(textDateFrom);

    let iconImgDateTo = document.createElement("img");
    li.appendChild(iconImgDateTo);
    iconImgDateTo.src = "img/icon/date-to.svg";
    iconImgDateTo.alt = "Date to";
    let dateEV = new Date(element.eindVakantie);
    const textDateTo = document.createTextNode("Datum tot " + dtFormat.format(dateEV));
    li.appendChild(textDateTo);

    let divLinks = document.createElement("div");
    divCardInfo.appendChild(divLinks);
    divLinks.className = "links";

    let linksA = document.createElement("a");
    divLinks.appendChild(linksA);
    linksA.href = "#";
    const textLinksA = document.createTextNode("Stuur een match verzoek");
    linksA.appendChild(textLinksA);

    let aImg = document.createElement("img");
    linksA.appendChild(aImg);
    aImg.src = "img/icon/send.png";
    aImg.alt = "Send";
});

//FYSCloud.API.deleteFile("");

console.log(data);
//console.log(data.values(data)[0]); // {one: '1'} -> returns '1'
//console.log(data.keys(data)); // {one: '1'} -> returns 'one'

/* Joey login.html oud
<main class="main-logIn">
    <div class="container-1-Inlog">
        <div class="inlogBox">
            <input type="checkbox" class="button_aanmelden" id="chk">
            <div class="aanmelden">
                <label class="label_aanmelden" for="chk">Registreren</label>
                <form class="form_aanmelden">
                    <input class="input_aanmelden" id="email_aanmelden" type="email" placeholder="Email" required>
                    <input class="input_aanmelden" id="wachtwoord_aanmelden" type="password" placeholder="Wachtwoord"
                           required>
                    <button class="button_aanmelden">Registreren</button>
                    <p>
                        Al een account,
                        <label class="smalltext" for="chk">klik hier.</label>
                    </p>
                </form>
            </div>
            <div class="inloggen">
                <label class="label_inloggen" for="chk">Log in</label>
                <form class="form_inloggen">
                    <input class="input_inloggen" id="email_inloggen" type="email" placeholder="Email" required>
                    <input class="input_inloggen" id="wachtwoord_inloggen" type="password" placeholder="Wachtwoord"
                           required>
                    <button class="button_inloggen">Inloggen</button>
                    <p class="nogGeenAccount">
                        Nog geen account,
                        <label class="smalltext2" for="chk">klik hier.</label>
                    </p>
                </form>
            </div>
        </div>
    </div>
</main>

// TEST DATA
let wachtwoord = "joey";
let email = "hoi";

// SQL LIKE mag maar 1 waarde hebben, dus dit is fout
// log in
async function inloggen(){
    FYSCloud.API.queryDatabase(
        "SELECT * FROM account WHERE (email, wachtwoord) LIKE (?, ?) ", // Vraagt of email in de database zit
        [email, wachtwoord]                                             // en of het wachtwoord bij de email hoort
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
}

// Aanmelden
async function aanmelden(){
    await FYSCloud.API.queryDatabase(
        "SELECT * FROM account WHERE email NOT LIKE ? ", // Vraagt of email NOG NIET in de database zit
        email
    ).then(function (data) {
        insertAccount();
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
}

async function insertAccount() {
    await FYSCloud.API.queryDatabase(
        "INSERT INTO account (email, wachtwoord) VALUES (?, ?)", // Voegt de persoon toe aan de database
        [email, wachtwoord]
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
} */