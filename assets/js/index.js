document.addEventListener('DOMContentLoaded', () => {

    FYSCloud.API.configure({
        url: "https://api.fys.cloud",
        apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
        database: "fys_is101_4_live",
        environment: "mockup"
    });

    var userId = FYSCloud.Session.get("userId", 0);
    console.log(userId);

    async function getData() {
        try {
            const dataTeen = await FYSCloud.API.queryDatabase(
                "SELECT * FROM account"
            );
            return dataTeen;
        } catch (error) {
            return null;
        }
    }

    // let dataTeen = await getData();

    console.log(getData()); // Hier wordt de laatste id weergegeven
});