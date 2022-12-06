FYSCloud.API.configure({
    url: "https://api.fys.cloud",
    apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
    database: "fys_is101_4_live",
    environment: "mockup"
});

FYSCloud.API.queryDatabase(
    "SELECT * FROM usertype"
).then(function(data) {
    console.log(data);
}).catch(function(reason) {
    console.log(reason);
});