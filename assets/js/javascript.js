class myHeader extends HTMLElement {
    connectedCallback() {
        // Any time this element is connected to a document this function will run
        this.innerHTML = `
            <header>
                <a href="../index.html">
                    <img id="logo" src="img/corendon_logo.png" alt="Corendon logo">
                </a>
                <nav>
                    <ul>
                        <li><a href="../index.html"><img src="img/home_icon.png" alt="Home icon"></a></li>
                        <li><a href="profiel.html">Profiel</a></li>
                        <li><a href="matches.html">Matches</a></li>
                        <li><a href="potentiële_matches.html">Potentiële matches</a></li>
                        <li><a href="over.html">Over</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
                <p class="checklist">✓ Gratis gebruik maken van de webapplicatie ✓ Profiel binnen 5 minuten gemaakt 
                ✓ Andere reizigers vinden met dezelfde interesses</p>
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
            <footer>
                <p><a href="mailto:corendon@example.com">corendon@example.com</a></p>
                <p>@ 2022 Corendon</p>
            </footer>
        `
    }
}

// Any time the HTML parser runs across a tag named my-footer, it will populate its innerHTML
customElements.define('my-footer', myFooter)