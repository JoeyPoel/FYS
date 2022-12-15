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
            const data = await FYSCloud.API.queryDatabase(
                "SELECT account_id FROM account"
            );
            console.log(data);
            return data;
        } catch (error) {
            return null;
        }
    }

    getData(); // Functie wordt aangeroepen

    // Remove everything from the session
    // FYSCloud.Session.clear();
});