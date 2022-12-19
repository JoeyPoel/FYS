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
            //console.log(data);
            //console.log(FYSCloud.Session.get());
            //console.log(data[0].idAccount);
            return console.log(data[0].idAccount);
        } catch (error) {
            return null;
        }
    }
    // if statement that checks if the object is empty
    if (Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
        console.log("Object is empty. Register or login to show object/session data.");
    } else {
        //console.log(object); // View object
        //console.log(Object.keys(object)); // View object
        getData(); // Functie wordt aangeroepen
    }

    // Remove everything from the session
    //FYSCloud.Session.clear();

    // Login/logout button
    // if statement that checks if obejct/session is empty. If object/session is not empty, then user is logged in and logout button appears
    if (Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
        document.querySelector("#login-logout").innerHTML = "Login";
        document.querySelector("#login-logout").onclick = function () {
            window.location.href='assets/login.html';
        }
    } else {
        document.querySelector("#login-logout").innerHTML = "Logout";
        document.querySelector("#login-logout").onclick = function () {
            FYSCloud.Session.clear(); // Remove everything from the session
            refreshPage(); // If a session exists and user clicks on "logout", then refresh the page and the login-logout button will say "Login".
        }
    }
    // function that refreshes the page
    function refreshPage(){
        window.location.reload();
    }

    /* document.querySelector("#login-logout").onclick = function () {
        // if statement that checks if obejct/session is empty. If object/session is not empty, then user is logged in and logout button appears
        if (Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
            console.log("You are not logged in.");
        } else {
            const buttonText = document.querySelector("#login-logout");
            const newButtonText = document.createElement("p");
            newButtonText.innerText = "Logout";
            buttonText.innerHTML = "";
            buttonText.append(newButtonText);
        }
    } */
});