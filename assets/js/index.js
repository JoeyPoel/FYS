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

    async function getData() {
        try {
            const data = await FYSCloud.API.queryDatabase(
                "SELECT idAccount FROM account WHERE gebruikersnaam=?;",
                [Object.keys(object)]
            );
            //FYSCloud.Session.set("userId", data[0].idAccount);
            //console.log(data[0].idAccount);
            //console.log(FYSCloud.Session.get());
            console.log(data);
            return data;
        } catch (error) {
            return null;
        }
    }
    // if statement that checks if the object is empty
    if (Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
        console.log("Object is empty.");
    } else {
        getData(); // Functie wordt aangeroepen
    }
    //console.log(object);

    // SQL die de id pakt van WHERE username

    // Remove everything from the session
    //FYSCloud.Session.clear();
});