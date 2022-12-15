
// DATA
let email = document.getElementById('email').value;
let wachtwoord = document.getElementById('wachtwoord').value;

/**
 *
 * SQL LIKE mag maar 1 waarde hebben, dus dit is fout
 */
// log in
async function controleerEmail(){
    await FYSCloud.API.queryDatabase(
        "SELECT * FROM account WHERE (email) = (?) ", // Vraagt of email in de database zit
        [email]
    ).then(function (data) {
        console.log(data);
        controleerWachtwoord()
    }).catch(function (reason) {
        console.log(reason);
    });
}

async function controleerWachtwoord(){
    await FYSCloud.API.queryDatabase(
        "SELECT * FROM account WHERE (wachtwoord) = (?) ", // Vraagt of wachtwoord in de database zit
        [wachtwoord]
    ).then(function (data) {
        console.log(data);
        inloggen();
    }).catch(function (reason) {
        console.log(reason);
    });
}

async function inloggen(){
    // NU MOET IE EEN SESSIE CREËREN
}

// Aanmelden
async function aanmelden(){
    await FYSCloud.API.queryDatabase(
        "SELECT * FROM account WHERE email != ? ", // Vraagt of email NOG NIET in de database zit
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
