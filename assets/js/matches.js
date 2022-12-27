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
            "SELECT idAccountPersoonEen, idAccountPersoonTwee, isAccepted FROM `fys_is101_4_live`.`match` " +
            "WHERE isAccepted = TRUE;"
        );
        return data;
    } catch (error) {
        return null;
    }
}

data.forEach((element) => {
    let divOne = document.createElement("div");
    document.querySelector(".div-container-matches").appendChild(divOne);
    divOne.innerText = element.idAccountPersoonEen;

    let divContainer = document.createElement("div");
    divOne.appendChild(divContainer);
    divContainer.innerText = element.idAccountPersoonTwee;

    let divContainerTwo = document.createElement("div");
    divOne.appendChild(divContainerTwo);
    divContainerTwo.innerText = element.isAccepted;
});

console.log(data);
//console.log(data.values(data)[0]); // {one: '1'} -> returns '1'
//console.log(data.keys(data)); // {one: '1'} -> returns 'one'