FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_live",
    environment: "mockup"
});

let data = await getData();

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

data.forEach((element) => {
    let dtFormat = new Intl.DateTimeFormat('nl-NL');

    let divOne = document.createElement("li");
    document.querySelector("#append-list-ul").appendChild(divOne);
    divOne.className = "append-list-ul";

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
    aImg.src = "img/icon/send.svg";
    aImg.alt = "Send";
});

console.log(data);
//console.log(data.values(data)[0]); // {one: '1'} -> returns '1'
//console.log(data.keys(data)); // {one: '1'} -> returns 'one'