class myHeader extends HTMLElement {
    connectedCallback() {
        // Any time this element is connected to a document this function will run
        this.innerHTML = `
            <header>
                <div class="top-bar">
                    <a href="../index.html">
                        <img class="header-logo" src="img/corendon_logo.png" alt="Corendon logo">
                    </a>
                </div>
                <div class="middle-bar">
                    <nav>
                        <ul class="nav-links">
                            <li><a class="list-link-logo" href="../index.html"><img src="img/home_icon.png" alt="Home icon"></a></li>
                            <li><a class="list-link" href="profiel.html">Profiel</a></li>
                            <li><a class="list-link" href="matches.html">Matches</a></li>
                            <li><a class="list-link" href="potentiële_matches.html">Zoek andere reizigers</a></li>
                            <li><a class="list-link" href="over.html">Over</a></li>
                            <li><a class="list-link" href="contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="bottom-bar">
                    <p class="checklist">✓ Gratis gebruik maken van de webapplicatie ✓ Profiel binnen 5 minuten gemaakt 
                    ✓ Andere reizigers vinden met dezelfde interesses</p>
                </div>
            </header>
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
                    <div class="footer-box-1">
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

// Profiel
// CRUD - Create, Read, Update, Delete

/*function validateForm() {
    let x = document.forms["form"]["voornaam"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}*/

function Submit() {
    var dataEntered = retrieveData();
    console.log(dataEntered);
}

function retrieveData() {
    var voornaam = document.getElementById("voornaam").value;
    var tussenvoegsel = document.getElementById("tussenvoegsel").value;
    var achternaam = document.getElementById("achternaam").value;
    var email = document.getElementById("email").value;
    var wachtwoord = document.getElementById("wachtwoord").value;
    //var wachtwoordbv = document.getElementById("wachtwoordbv").value;
    var telnummer = document.getElementById("telnummer").value;
    var leeftijd = document.getElementById("leeftijd").value;
    //var dot_one = document.getElementById("dot-1").value;
    //var dot_two = document.getElementById("dot-2").value;
    //var dot_three = document.getElementById("dot-3").value;
    //var interesses = document.getElementById("interesses").value;
    var budget = document.getElementById("budget").value;
    var soortVakantie = document.getElementById("soortVakantie").value;

    // Geen wachtwoordbv, specifieke gender

    var arr = [voornaam, tussenvoegsel, achternaam, email, wachtwoord, telnummer, leeftijd, budget, soortVakantie];
    return arr;
}

//Over pagina scroll

const boxes = document.querySelectorAll('.info');

window.addEventListener('scroll',checkInfo);

checkInfo();

function checkInfo() {
    const triggerBottom = window.innerHeight / 5 * 4;

    boxes.forEach((info) =>{
        const boxTop = info.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            info.classList.add('show');
        } else {
            info.classList.remove('show')
        }
    })
}

// Slides op main page

let counter = 2;

setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);

// Matches
function instagram() {
    location.replace("https://www.instagram.com/")
}

FYSCloud.API.queryDatabase(
    "SELECT * FROM message"
).then(function(data) {
    console.log(data);
}).catch(function(reason) {
    console.log(reason);
});