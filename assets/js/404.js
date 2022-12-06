FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_live",
    environment: "mockup"
});

let data = await getData();
document.getElementById("div-test").innerText = data[1].email;
makeDiv("Hoi Joey");makeDiv("heeeey");

/*FYSCloud.API.queryDatabase(
    "SELECT * FROM account"
).then(function(data) {
    console.log(data);
}).catch(function(reason) {
    console.log(reason);
});*/
/*function getData() {
    FYSCloud.API.queryDatabase(
        "SELECT * FROM account"
    ).then(function (data) {
        console.log(data);
        return data;
    }).catch(function (reason) {
        console.error(reason);
        return null;
    });
}*/

async function getData() {
    try {
        const data = await FYSCloud.API.queryDatabase(
            "SELECT * FROM account"
        );
        return data;
    } catch (error) {
        return null;
    }
}

function makeDiv(divParameter) {
    let div = document.createElement("div"); // creates div element
    document.getElementById("div-test").appendChild(div); // plakt div element aan test-div element
    div.innerText = divParameter;
    div.className = "divPersoonOpmaak";
}

for (let i = 0; i < data.length; i++) {
    makeDiv(data[i].email);
}