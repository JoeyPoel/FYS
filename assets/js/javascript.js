document.addEventListener('DOMContentLoaded', () => {

    class myHeader extends HTMLElement {
        connectedCallback() {
            // Any time this element is connected to a document this function will run
            this.innerHTML = `
               
              
              
               
                  <div class="Navbar">
                        <nav>
                            <ul class="Navbar-button" id="MyNavbar">
                                <li><a href="../index.html" class="Logo">LOGO</a></li>
                                <li><a href="Log_in.html" class="button">LOG IN</a></li>
                                <li><a href="contact.html" class="button" class="Contact">CONTACT</a></li>
                                <li><a href="../index.html#over" class="button" class="Over">OVER</a</li>
                                <li><a href="matches.html" class="button" class="Matches">MATCHES</a></li>
                                <li><a href="potentiële_matches.html" class="button" class="Zoek-Andere-Reizigers">ZOEK ANDERE REIZIGERS</a></li>
                                <li><a href="profiel.html" class="button" class="Contact"> PROFIEL</a></li>
                            </ul>
                        </nav>
                        
                  </div>
                  
                    
      
                        
                
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

    window.addEventListener('scroll', checkInfo);

    checkInfo();

    function checkInfo() {
        const triggerBottom = window.innerHeight / 5 * 4;

        boxes.forEach((info) => {
            const boxTop = info.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                info.classList.add('show');
            } else {
                info.classList.remove('show')
            }
        })
    }

    // fade in van info pagina //

    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -150px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
            entries,
            appearOnScroll
        ) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add("appear");
                    appearOnScroll.unobserve(entry.target);
                }
            });
        },
        appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Slides op main page
    let counter = 2;

    setInterval(function () {
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
    async function handleImageUpload() {

        let image = document.getElementById("profielFoto").files[0];

        let reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("display-image").src = e.target.result;
        }

        reader.readAsDataURL(image);
    }

    // PROFIEL UPLOAD
    document.getElementById('btn').addEventListener('click', addProfiel);

    async function addProfiel() {
        let voornaam = document.getElementById('voornaam').value;
        let tussenvoegsel = document.getElementById('tussenvoegsel').value;
        let achternaam = document.getElementById('achternaam').value;
        let email = document.getElementById('email').value;
        let wachtwoord = document.getElementById('wachtwoord').value;
        let telefoonNummer = document.getElementById('telnummer').value;
        let leeftijd = document.getElementById('leeftijd').value;
        let persoon_info = document.getElementById('eigenTekst').value;


        let profielFoto = document.getElementById('profielFoto').value;

        let instagram = document.getElementById('Instagram').value;
        let twitter = document.getElementById('Twitter').value;
        let linkedIn = document.getElementById('LinkedIn').value;
        let facebook = document.getElementById('Facebook').value;
        let whatsapp = document.getElementById('Whatsapp').value;
        let telegram = document.getElementById('Telegram').value;

        let account_id = 45;

        // EMAIL EN WACHTWOORD
        await FYSCloud.API.queryDatabase(
            "INSERT INTO account (email, wachtwoord) VALUES (?, ?)", // Voegt de persoon toe aan de database
            [email, wachtwoord]
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
        });

        // STANDAARD INFO
        FYSCloud.API.queryDatabase(
            "INSERT INTO persoon (account_id, voornaam, tussenvoegsel, achternaam, telefoon, leeftijd, foto, persoon_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [account_id, voornaam, tussenvoegsel, achternaam, telefoonNummer, leeftijd, profielFoto, persoon_info]
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
            console.log("Insert mislukt")
        });


        // RADIO EN SELECTIONS
        // await FYSCloud.API.queryDatabase(
        //     "INSERT INTO persoon (foto, geslacht, budget, soort_vakantie, leeftijdsgrens_reispartner, persoon_info) VALUES (?, ?, ?, ?, ?, ?)",
        //     []
        // ).then(function (data) {
        //     console.log(data);
        // }).catch(function (reason) {
        //     console.log(reason);
        // });

        //SOCIALMEDIA
        await FYSCloud.API.queryDatabase(
            "INSERT INTO sociale_media (instagram, twitter, linkedin, facebook, whatsapp, telegram) VALUES (?, ?, ?, ?, ?, ?)",
            [instagram, twitter, linkedIn, facebook, whatsapp, telegram]
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
        });
    }

    // TEST DATA
    let wachtwoord = "joey";
    let email = "hoi";

    /**
     *
     * SQL LIKE mag maar 1 waarde hebben, dus dit is fout
     */
    // log in
    async function inloggen(){
        FYSCloud.API.queryDatabase(
            "SELECT * FROM account WHERE (email, wachtwoord) LIKE (?, ?) ", // Vraagt of email in de database zit
            [email, wachtwoord]                                             // en of het wachtwoord bij de email hoort
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
        });
    }


    // Aanmelden
    async function aanmelden(){
    await FYSCloud.API.queryDatabase(
        "SELECT * FROM account WHERE email NOT LIKE ? ", // Vraagt of email NOG NIET in de database zit
        email
    ).then(function (data) {
        insertAccount();
        console.log(data);
    }).catch(function (reason) {
        console.log(reason);
    });
    }

    async function insertAccount() {
        await FYSCloud.API.queryDatabase(
            "INSERT INTO account (email, wachtwoord) VALUES (?, ?)", // Voegt de persoon toe aan de database
            [email, wachtwoord]
        ).then(function (data) {
            console.log(data);
        }).catch(function (reason) {
            console.log(reason);
        });
    }


});