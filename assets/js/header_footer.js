class myHeader extends HTMLElement {
    connectedCallback() {
        // Any time this element is connected to a document this function will run
        this.innerHTML = `
            <nav class="navbar">
                <div class="brand-title">
                    <div class="brand-name"><a href="../index.html">Fys PUBG</a></div>
                    <div class="banner_blok">
                        <a href="../index.html"><img class="banner_blok_img" src="../assets/img/logo/logo.png"></a>
                    </div>
                </div>
                <a href="#" class="toggle-button">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </a>
                <div class="navbar-links">
                    <ul>
                        <li><a id="profiel" href="profiel.html">Profiel</a></li>
                        <li><a id="mogelijke_reispartner" href="mogelijke_reispartner.html">Mogelijke reispartner</a></li>
                        <li><a id="matches" href="matches.html">Matches</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="over.html">Over</a></li>
                        <li><button id="login-logout">Login</button></li>
                    </ul>
                </div>
            </nav>
        `
    }
}

// Any time the HTML parser runs across a tag named my-header, it will populate its innerHTML
customElements.define('my-header', myHeader);

class myFooter extends HTMLElement {
    connectedCallback() {
        // Any time this element is connected to a document this function will run
        this.innerHTML = `
            <div class="container-1-footer">
                <footer>
                    <div>
                        <p><a href="mailto:corendon@example.com">corendon@example.com</a></p>
                        <p>@ 2022 Corendon</p>
                    </div>
                </footer>
            </div>
        `
    }
}

// Any time the HTML parser runs across a tag named my-footer, it will populate its innerHTML
customElements.define('my-footer', myFooter);

document.addEventListener('DOMContentLoaded', () => {

    FYSCloud.API.configure({
        url: "https://api.fys.cloud",
        apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
        database: "fys_is101_4_live",
        environment: "mockup"
    });

    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    // Hamburger menu pops open and closes when you click it
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active')
    });

    let object = FYSCloud.Session.get();
    //console.log(object);
    console.log(Object.values(object)[0]); // {one: '1'} -> returns '1'
    //console.log(Object.keys(object)); // {one: '1'} -> returns 'one'

    async function getData() {
        try {
            const data = await FYSCloud.API.queryDatabase(
                "SELECT idAccount FROM account WHERE email=?;",
                [Object.keys(object)]
            );
            //console.log(data);
            //console.log(FYSCloud.Session.get());
            //console.log(data[0].idAccount);
            let userId = data[0].idAccount;
            return console.log(userId);
        } catch (error) {
            return null;
        }
    }

    // Function that sets the new session id
    async function getDataId() {
        try {
            let status = true;
            const data = await FYSCloud.API.queryDatabase(
                "SELECT * FROM fys_is101_4_live.`account` WHERE email=?;",
                [Object.keys(object)]
            );
            // if statement that checks if variable data has any values
            if (!data.length) {
                console.log("No data!");
                status = false;
            } else { // else statement for when variable data has values
                console.log("There is data.");
                console.log(data[0].idAccount);
                //console.log(data.length);
                FYSCloud.Session.set(Object.keys(object), data[0].idAccount);
            }
            return status;
        } catch (error) {
            return null;
        }
    }

    async function getDataPersoon() {
        try {
            const data = await FYSCloud.API.queryDatabase(
                "SELECT voornaam FROM `fys_is101_4_live`.persoon WHERE idAccount=?;",
                [Object.values(object)[0]]
            );
            //console.log(data);
            //console.log(FYSCloud.Session.get());
            //console.log(data[0].idAccount);
            let userId = data[0].voornaam;
            console.log(userId);
            return document.getElementById('profiel').style.display = 'none';
        } catch (userId) {
            // No data found
            return console.log(userId);
        }
    }

    // if statement that checks if the object is empty
    if (Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
        //console.log("Object is empty. Register or login to show object/session data.");
    } else {
        //console.log(object); // View object
        //console.log(Object.keys(object)); // View object
        getData(); // Functie wordt aangeroepen
        getDataId();
    }

    // Remove everything from the session
    //FYSCloud.Session.clear();

    // Login/logout button
    // if statement that checks if obejct/session is empty. If object/session is not empty, then user is logged in and logout button appears
    if (Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
        document.querySelector("#login-logout").innerHTML = "Login";
        document.querySelector("#login-logout").onclick = function () {
            window.location.href='login.html';
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

    // // Visible/Invisible items in menu like 'profiel'
    // if (Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
    //     // object/session is empty
    //     document.getElementById('profiel').style.display = 'none';
    //     document.getElementById('mogelijke_reispartner').style.display = 'none';
    //     document.getElementById('matches').style.display = 'none';
    // } else {
    //     // object/session is not empty
    //     getDataPersoon();
    // }

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