
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
