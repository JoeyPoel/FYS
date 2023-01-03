FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_live",
    environment: "mockup"
});

const filterBtn = document.querySelectorAll(".button-value");
let object = FYSCloud.Session.get();
//console.log(object);
console.log(Object.values(object)[0]); // {one: '1'} -> returns '1'
//console.log(Object.keys(object)); // {one: '1'} -> returns 'one'

async function getData() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `fys_is101_4_live`.`persoon` WHERE NOT (voornaam='admin' || idAccount=?);",
            [Object.values(object)[0]]
        );
        //console.log({data});
        return {data};
    } catch (error) {
        return null;
    }
}

async function getMatchData() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `fys_is101_4_live`.`match`;"
        );
        //console.log({data});
        return {data};
    } catch (error) {
        return null;
    }
}

// function that refreshes the page
function refreshPage() {
    window.location.reload();
}
//document.addEventListener('DOMContentLoaded', () => {
    // Initially display all products
    //window.onload = () => {
    filterProduct("all");
    //};
//});

let person = await getData();
console.log(person);
let match = await getMatchData();
console.log(match);
console.log(match.data);

const index = match.data.map(object => object.idAccountPersoonEen);
console.log(index);

const indexTwo = match.data.map(object => object.idAccountPersoonTwee);
console.log(indexTwo);

for (let i of person.data) {
    let dtFormat = new Intl.DateTimeFormat('nl-NL');

    let divOne = document.createElement("li");
    document.querySelector("#append-list-ul").appendChild(divOne);
    divOne.classList.add("liCard", i.bestemming, "hide");

    let divContainer = document.createElement("div");
    divOne.appendChild(divContainer);
    divContainer.className = "container";

    let divCard = document.createElement("div");
    divContainer.appendChild(divCard);
    divCard.className = "card";

    let imgProfile = document.createElement("img");
    divCard.appendChild(imgProfile);
    imgProfile.className = "profile-img";
    imgProfile.src = "https://mockup-is101-4.fys.cloud/uploads/" + i.profielfoto;
    imgProfile.alt = "User profile";

    let divCardInfo = document.createElement("div");
    divCard.appendChild(divCardInfo);
    divCardInfo.className = "card-info";

    let personName = document.createElement("h1");
    divCardInfo.appendChild(personName);
    personName.innerText = i.voornaam + ' ' + i.tussenvoegsel + ' ' + i.achternaam;

    let personBio = document.createElement("p");
    divCardInfo.appendChild(personBio);
    personBio.innerText = i.bio;

    let ul = document.createElement("ul");
    divCardInfo.appendChild(ul);

    let li = document.createElement("li");
    ul.appendChild(li);

    let iconImgLocation = document.createElement("img");
    li.appendChild(iconImgLocation);
    iconImgLocation.src = "img/icon/location.svg";
    iconImgLocation.alt = "Location";
    const textLocation = document.createTextNode(i.bestemming);
    li.appendChild(textLocation);

    let iconImgInterest = document.createElement("img");
    li.appendChild(iconImgInterest);
    iconImgInterest.src = "img/icon/interest.svg";
    iconImgInterest.alt = "Interest";
    const textInterest = document.createTextNode("Interesse " + i.interesse);
    li.appendChild(textInterest);

    let iconImgCalendar = document.createElement("img");
    li.appendChild(iconImgCalendar);
    iconImgCalendar.src = "img/icon/calendar.svg";
    iconImgCalendar.alt = "Calendar";
    let dateGB = new Date(i.geboortedatum);
    const textCalendar = document.createTextNode("Geboortedatum " + dtFormat.format(dateGB));
    li.appendChild(textCalendar);

    let iconImgGender = document.createElement("img");
    li.appendChild(iconImgGender);
    iconImgGender.src = "img/icon/gender.svg";
    iconImgGender.alt = "Gender";
    const textGender = document.createTextNode("Geslacht " + i.geslacht);
    li.appendChild(textGender);

    let iconImgDateFrom = document.createElement("img");
    li.appendChild(iconImgDateFrom);
    iconImgDateFrom.src = "img/icon/date-from.svg";
    iconImgDateFrom.alt = "Date from";
    let dateBV = new Date(i.beginVakantie);
    const textDateFrom = document.createTextNode("Datum van " + dtFormat.format(dateBV));
    li.appendChild(textDateFrom);

    let iconImgDateTo = document.createElement("img");
    li.appendChild(iconImgDateTo);
    iconImgDateTo.src = "img/icon/date-to.svg";
    iconImgDateTo.alt = "Date to";
    let dateEV = new Date(i.eindVakantie);
    const textDateTo = document.createTextNode("Datum tot " + dtFormat.format(dateEV));
    li.appendChild(textDateTo);

    let divLinks = document.createElement("div");
    divCardInfo.appendChild(divLinks);
    divLinks.className = "links";

    let button = document.createElement("button");
    divLinks.appendChild(button);
    button.className = "matchBtn";
    button.value = i.idAccount;
    button.onclick = () => {
        if (button.value == Object.values(object)[0]) {
            alert("Je kunt niet met jezelf matchen!");
        } else {
            for (let x = 0; x < index.length; x++) {
                /* if (Object.values(object)[0] == index.idAccountPersoonEen && button.value == index.idAccountPersoonTwee) {
                    //alert("Je hebt al een matchverzoek verstuurd naar deze persoon!");
                    alert(index.idAccountPersoonEen + " " + index.idAccountPersoonTwee);
                } */
                if (Object.values(object)[0] == index[x] && button.value == indexTwo[x]) {
                    alert("Je hebt al een matchverzoek verstuurd naar deze persoon!");
                    //alert(index[x] + " " + indexTwo[x]);
                } else {
                    const data = FYSCloud.API.queryDatabase(
                        "INSERT INTO `fys_is101_4_live`.`match` VALUES (?, ?, FALSE);",
                        [Object.values(object)[0], i.idAccount]
                    );
                    refreshPage();
                    //console.log(data);
                }
                //console.log(index[x]);
                //console.log(indexTwo[x]);
            }

            // else if (Object.values(object)[0] == j.idAccountPersoonEen && button.value == j.idAccountPersoonTwee) {
            //     console.log("Success");
            //     console.log(button.value);
            //     /* const data = FYSCloud.API.queryDatabase(
            //         "INSERT INTO `fys_is101_4_live`.`match` VALUES (?, ?, FALSE);",
            //         [Object.values(object)[0], i.idAccount]
            //     );
            //     console.log(data); */
            // }
        }
    };

    let linksA = document.createElement("a");
    button.appendChild(linksA);
    linksA.href = "#";
    const textLinksA = document.createTextNode("Stuur een match verzoek");
    linksA.appendChild(textLinksA);

    let aImg = document.createElement("img");
    linksA.appendChild(aImg);
    aImg.src = "img/icon/send.svg";
    aImg.alt = "Send";

    /* if (Object.values(object)[0] == i.idAccountPersoonEen) {
        console.log("BOYZ");
    } */
}

// Parameter passed from button (Parameter same as category)
function filterProduct(value) {
    // Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        // Check if value equals innerText
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    // Select all cards
    let elements = document.querySelectorAll(".liCard");
    // Loop through all cards
    elements.forEach((element) => {
        // Display all cards on 'all' button click
        if (value == "all") {
            element.classList.remove("hide");
        } else {
            // Check if element contains bestemming class
            if (element.classList.contains(value)) {
                // Display element based on bestemming
                element.classList.remove("hide");
            } else {
                // Hide other elements
                element.classList.add("hide");
            }
        }
    });
}

for (let j = 0; j < filterBtn.length; j++) {
    filterBtn[j].onclick = () => {
        console.log(filterBtn[j].value);
        filterProduct(filterBtn[j].value);
    };
}

/*
//Search button click
document.getElementById("search").addEventListener("click", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");

    //loop through all elements
    elements.forEach((element, index) => {
        //check if text includes the search value
        if (element.innerText.includes(searchInput.toUpperCase())) {
            //display matching card
            cards[index].classList.remove("hide");
        } else {
            //hide others
            cards[index].classList.add("hide");
        }
    });
}); */

//console.log(data);
//console.log(data.values(data)[0]); // {one: '1'} -> returns '1'
//console.log(data.keys(data)); // {one: '1'} -> returns 'one'