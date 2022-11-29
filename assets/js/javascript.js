document.addEventListener('DOMContentLoaded', ()=>{

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
    document.getElementById('radio' + counter).checked = true
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);


// const popup = document.getElementsByClassName("popup");
//
// function openPopup(){
//     popup.classList.add("open-popup");
// }
// function closePopup(){
//     popup.classList.remove("open-popup");
// }


function bruh() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
// PROFIEL FOTO UPLOAD
function handleImageUpload()
{

    var image = document.getElementById("profielFoto").files[0];

    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById("display-image").src = e.target.result;
    }

    reader.readAsDataURL(image);

}


// PROFIEL UPLOAD

document.getElementById('btn').addEventListener('click',addProfiel);

async function addProfiel() {
    let voornaam = document.getElementById('voornaam').value;
    let tussenvoegsel = document.getElementById('tussenvoegsel').value;
    let achternaam = document.getElementById('achternaam').value;
    let email = document.getElementById('email').value;
    let wachtwoord = document.getElementById('wachtwoord').value;
    let telefoonNummer = document.getElementById('telnummer').value;
    let leeftijd = document.getElementById('leeftijd').value;
    let profielFoto = document.getElementById('profielFoto').value;

    let instagram = document.getElementById('').value;
    let twitter = document.getElementById('').value;
    let linkedIn = document.getElementById('').value;
    let facebook = document.getElementById('').value;
    let whatsapp = document.getElementById('').value;
    let telegram = document.getElementById('').value;

    // EMAIL EN WACHTWOORD
    await FYSCloud.API.queryDatabase(
        "INSERT INTO account (email, password) VALUES (?, ?)",
        [email, wachtwoord]
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });

    // STANDAARD INFO
    await FYSCloud.API.queryDatabase(
        "INSERT INTO persoon (voornaam, tussenvoegsel, achternaam, telefoon, leeftijd, persoon_info) VALUES (?)",
        [voornaam, tussenvoegsel, achternaam, telefoonNummer, leeftijd]
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });

    // RADIO EN SELECTIONS
    await FYSCloud.API.queryDatabase(
        "INSERT INTO persoon (foto, geslacht, budget, soort_vakantie, leeftijdsgrens_reispartner, persoon_info) VALUES (?)",
        []
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });

    //SOCIALMEDIA
    await FYSCloud.API.queryDatabase(
        "INSERT INTO sociale_media (instagram, twitter, linkedin, facebook, whatsapp, telegram) VALUES (?)",
        [instagram, twitter, linkedIn, facebook, whatsapp, telegram]
    ).then(function (data) {
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
}
});




