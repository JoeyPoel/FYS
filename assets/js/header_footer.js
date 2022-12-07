class myHeader extends HTMLElement {
    connectedCallback() {
        // Any time this element is connected to a document this function will run
        this.innerHTML = `
            <div class="Navbar">
                <nav>
                    <ul class="Navbar-button" id="MyNavbar">
                        <li><a href="../index.html" class="Logo">LOGO</a></li>
                        <li><a href="login.html" class="button">LOG IN</a></li>
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