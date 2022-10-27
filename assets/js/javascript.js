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
                            <li><a class="list-link" href="potentiële_matches.html">Potentiële matches</a></li>
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
customElements.define('my-header', myHeader)

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
customElements.define('my-footer', myFooter)