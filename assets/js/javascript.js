class myHeader extends HTMLElement {
    connectedCallback() {
        // Any time this element is connected to a document this function will run
        this.innerHTML = `
            <header>
                <a href="index.html">
                    <img src="#">
                </a>
                <nav>
                    <ul>
                        <li><a href="index.html">Startpagina</a></li>
                        <li><a href="#">Profiel</a></li>
                        <li><a href="#">Matches</a></li>
                        <li><a href="#">Potentiële matches</a></li>
                        <li><a href="#">Over</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
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