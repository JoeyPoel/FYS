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

let inkomendVerzoek = await getInkomendVerzoek();
let uitgaandVerzoek = await getUitgaandVerzoek();
let geaccepteerd = await getGeaccepteerd();

// function that refreshes the page
function refreshPage() {
    window.location.reload();
}

async function getInkomendVerzoek() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `fys_is101_4_live`.`persoon` LEFT JOIN `fys_is101_4_live`.`match` ON `persoon`.`idAccount` = `match`.`idAccountPersoonEen` WHERE idAccountPersoonTwee=? && isAccepted = FALSE;",
            [Object.values(object)[0]]
        );
        data.forEach((element) => {
            let dtFormat = new Intl.DateTimeFormat('nl-NL');

            let divOne = document.createElement("li");
            document.querySelector("#append-list-ul").appendChild(divOne);
            divOne.classList.add("liCard", element.bestemming);

            let divContainer = document.createElement("div");
            divOne.appendChild(divContainer);
            divContainer.classList = "container";

            let divCard = document.createElement("div");
            divContainer.appendChild(divCard);
            divCard.classList = "card";

            let imgProfile = document.createElement("img");
            divCard.appendChild(imgProfile);
            imgProfile.classList = "profile-img";
            imgProfile.src = "https://mockup-is101-4.fys.cloud/uploads/" + element.profielfoto;
            imgProfile.alt = "User profile";

            let divCardInfo = document.createElement("div");
            divCard.appendChild(divCardInfo);
            divCardInfo.classList = "card-info";

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
            divLinks.classList = "links";
            // Accepteren knop
            let button = document.createElement("button");
            divLinks.appendChild(button);
            button.classList = "matchBtn";
            button.value = element.idAccount;
            button.onclick = () => {
                const dataInsert = FYSCloud.API.queryDatabase(
                    "INSERT INTO `fys_is101_4_live`.`match` VALUES (?, ?, TRUE);",
                    [Object.values(object)[0], button.value]
                );
                const dataAccept = FYSCloud.API.queryDatabase(
                    "UPDATE `fys_is101_4_live`.`match` SET isAccepted = TRUE WHERE (idAccountPersoonEen = ? && idAccountPersoonTwee = ? && isAccepted = FALSE) || (idAccountPersoonEen = ? && idAccountPersoonTwee = ? && isAccepted = FALSE);",
                    [Object.values(object)[0], button.value, button.value, Object.values(object)[0]]
                );
                alert("Je hebt het match verzoek geaccepteerd!");
                refreshPage();
                //console.log(dataAccept);
                //console.log(button.value);
            };

            let linksA = document.createElement("a");
            button.appendChild(linksA);
            linksA.id = "accept";
            linksA.href = "#";
            const textLinksA = document.createTextNode("Accepteren");
            linksA.appendChild(textLinksA);

            let aImg = document.createElement("img");
            linksA.appendChild(aImg);
            aImg.src = "img/icon/checkmark.svg";
            aImg.alt = "Accept";
            // Afwijs knop
            let buttonTwo = document.createElement("button");
            divLinks.appendChild(buttonTwo);
            buttonTwo.classList = "matchBtn";
            buttonTwo.value = element.idAccount;
            buttonTwo.onclick = () => {
                const dataDelete = FYSCloud.API.queryDatabase(
                    "DELETE FROM `fys_is101_4_live`.`match` WHERE idAccountPersoonEen = ? && idAccountPersoonTwee = ? && isAccepted = FALSE;",
                    [buttonTwo.value, Object.values(object)[0]]
                );
                alert("Je hebt het match verzoek afgewezen!");
                refreshPage();
                //console.log(dataDelete);
                //console.log(buttonTwo.value);
            };

            let linksATwo = document.createElement("a");
            buttonTwo.appendChild(linksATwo);
            linksATwo.href = "#";
            const textLinksATwo = document.createTextNode("Afwijzen");
            linksATwo.appendChild(textLinksATwo);

            let aImgTwo = document.createElement("img");
            linksATwo.appendChild(aImgTwo);
            aImgTwo.src = "img/icon/cancel.svg";
            aImgTwo.alt = "Reject";
        });
        return data;
    } catch (error) {
        return null;
    }
}

async function getUitgaandVerzoek() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `fys_is101_4_live`.`persoon` LEFT JOIN `fys_is101_4_live`.`match` ON `persoon`.`idAccount` = `match`.`idAccountPersoonTwee` WHERE idAccountPersoonEen=? && isAccepted = FALSE;",
            [Object.values(object)[0]]
        );
        data.forEach((element) => {
            let dtFormat = new Intl.DateTimeFormat('nl-NL');

            let divOne = document.createElement("li");
            document.querySelector("#append-list-ul-two").appendChild(divOne);
            divOne.classList.add("liCard", element.bestemming);

            let divContainer = document.createElement("div");
            divOne.appendChild(divContainer);
            divContainer.classList = "container";

            let divCard = document.createElement("div");
            divContainer.appendChild(divCard);
            divCard.classList = "card";

            let imgProfile = document.createElement("img");
            divCard.appendChild(imgProfile);
            imgProfile.classList = "profile-img";
            imgProfile.src = "https://mockup-is101-4.fys.cloud/uploads/" + element.profielfoto;
            imgProfile.alt = "User profile";

            let divCardInfo = document.createElement("div");
            divCard.appendChild(divCardInfo);
            divCardInfo.classList = "card-info";

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
            divLinks.classList = "links";
            // Annuleer knop
            let button = document.createElement("button");
            divLinks.appendChild(button);
            button.classList = "matchBtn";
            button.value = element.idAccount;
            button.onclick = () => {
                const dataDelete = FYSCloud.API.queryDatabase(
                    "DELETE FROM `fys_is101_4_live`.`match` WHERE idAccountPersoonEen = ? && idAccountPersoonTwee = ? && isAccepted = FALSE;",
                    [Object.values(object)[0], button.value]
                );
                alert("Je hebt het match verzoek geannuleerd!");
                refreshPage();
                //console.log(dataDelete);
                //console.log(button.value);
            };

            let linksA = document.createElement("a");
            button.appendChild(linksA);
            linksA.href = "#";
            const textLinksA = document.createTextNode("Annuleren");
            linksA.appendChild(textLinksA);

            let aImg = document.createElement("img");
            linksA.appendChild(aImg);
            aImg.src = "img/icon/cancel.svg";
            aImg.alt = "Cancel";
        });
        return data;
    } catch (error) {
        return null;
    }
}

async function getGeaccepteerd() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT * FROM `fys_is101_4_live`.`persoon` INNER JOIN `fys_is101_4_live`.`match` ON `persoon`.`idAccount` = `match`.`idAccountPersoonEen` WHERE NOT idAccountPersoonEen = ? AND idAccountPersoonTwee = ? && isAccepted = TRUE;",
            [Object.values(object)[0], Object.values(object)[0]]
        );
        data.forEach((element) => {
            let dtFormat = new Intl.DateTimeFormat('nl-NL');

            let divOne = document.createElement("li");
            document.querySelector("#append-list-ul-three").appendChild(divOne);
            divOne.classList.add("liCard", element.bestemming);

            let divContainer = document.createElement("div");
            divOne.appendChild(divContainer);
            divContainer.classList = "container";

            let divCard = document.createElement("div");
            divContainer.appendChild(divCard);
            divCard.classList = "card";

            let imgProfile = document.createElement("img");
            divCard.appendChild(imgProfile);
            imgProfile.classList = "profile-img";
            imgProfile.src = "https://mockup-is101-4.fys.cloud/uploads/" + element.profielfoto;
            imgProfile.alt = "User profile";

            let divCardInfo = document.createElement("div");
            divCard.appendChild(divCardInfo);
            divCardInfo.classList = "card-info";

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
            divLinks.classList = "links";
            // Annuleer knop
            let button = document.createElement("button");
            divLinks.appendChild(button);
            button.classList = "matchBtn";
            button.value = element.idAccount;
            button.onclick = () => {
                const dataDelete = FYSCloud.API.queryDatabase(
                    "DELETE FROM `fys_is101_4_live`.`match` WHERE (idAccountPersoonEen = ? && idAccountPersoonTwee = ? && isAccepted = TRUE) || (idAccountPersoonEen = ? && idAccountPersoonTwee = ? && isAccepted = TRUE);",
                    [Object.values(object)[0], button.value, button.value, Object.values(object)[0]]
                );
                alert("Je hebt de match geannuleerd!");
                refreshPage();
                //console.log(dataDelete);
                //console.log(button.value);
            };

            let linksA = document.createElement("a");
            button.appendChild(linksA);
            linksA.href = "#";
            const textLinksA = document.createTextNode("Annuleer");
            linksA.appendChild(textLinksA);

            let aImg = document.createElement("img");
            linksA.appendChild(aImg);
            aImg.src = "img/icon/cancel.svg";
            aImg.alt = "Cancel";
        });
        return data;
    } catch (error) {
        return null;
    }
}

//console.log(data);
//console.log(data.values(data)[0]); // {one: '1'} -> returns '1'
//console.log(data.keys(data)); // {one: '1'} -> returns 'one'