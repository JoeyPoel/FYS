document.addEventListener('DOMContentLoaded', () => {

    FYSCloud.API.configure({
        url: "https://api.fys.cloud",
        apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
        database: "fys_is101_4_live",
        environment: "mockup"
    });

    const form = document.querySelector('#login-register-form');
    const usernameInput = document.querySelector('#username');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirm-password');

    form.addEventListener('submit', (event) => {
        validateForm();
        console.log(isFormValid());
        if (isFormValid() == true) {
            event.preventDefault();
            Promise.all([getData()]).then(values => {
                console.log(values);
                if (values[0] == true) {
                    console.log("FALSE");
                    alert("Gebruikersnaam of email bestaat al!");
                    event.preventDefault();
                } else {
                    console.log("TRUE");
                    form.submit();
                    insertData();
                }
            });
        } else {
            event.preventDefault();
        }
    });

    function isFormValid() {
        const inputContainers = form.querySelectorAll('.input-group');
        let result = true;
        inputContainers.forEach((container) => {
            if (container.classList.contains('error')) {
                result = false;
            }
        });
        return result;
    }

    function validateForm() {
        // USERNAME
        if (usernameInput.value.trim() == '') {
            setError(usernameInput, 'Name can not be empty');
        } else if (usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15) {
            setError(usernameInput, 'Name must be min 5 and max 15 charecters');
        } else {
            setSuccess(usernameInput);
        }
        // EMAIL
        if (emailInput.value.trim() == '') {
            setError(emailInput, 'Provide an email address');
        } else if (isEmailValid(emailInput.value)) {
            setSuccess(emailInput);
        } else {
            setError(emailInput, 'Provide a valid email address');
        }
        // PASSWORD
        if (passwordInput.value.trim() == '') {
            setError(passwordInput, 'Password can not be empty');
        } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
            setError(passwordInput, 'Password min 6 max 20 charecters');
        } else {
            setSuccess(passwordInput);
        }
        // CONFIRM PASSWORD
        if (confirmPasswordInput.value.trim() == '') {
            setError(confirmPasswordInput, 'Password can not be empty');
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            setError(confirmPasswordInput, 'Password does not match');
        } else {
            setSuccess(confirmPasswordInput);
        }
    }

    function setError(element, errorMessage) {
        const parent = element.parentElement;
        if (parent.classList.contains('success')) {
            parent.classList.remove('success');
        }
        parent.classList.add('error');
        const paragraph = parent.querySelector('p');
        paragraph.textContent = errorMessage;
    }

    function setSuccess(element) {
        const parent = element.parentElement;
        if (parent.classList.contains('error')) {
            parent.classList.remove('error');
        }
        parent.classList.add('success');
    }

    function isEmailValid(email) {
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return reg.test(email);
    }
    // Function with SQL that sends data to the database
    async function insertData() {
        try {
            FYSCloud.Session.set(emailInput.value, 49); // 49 is a random number that doesn't matter, because it will change to the id of the person in index.js
            const data = await FYSCloud.API.queryDatabase(
                "INSERT INTO account(gebruikersnaam, email, wachtwoord) VALUES(?, ?, ?)",
                [usernameInput.value, emailInput.value, passwordInput.value]
            );
            console.log(data);
            return data;
        } catch (error) {
            return null;
        }
    }
    // Function with SQL that retrieves data from the database
    async function getData() {
        try {
            let status = true;
            const data = await FYSCloud.API.queryDatabase(
                "SELECT * FROM fys_is101_4_live.`account` WHERE gebruikersnaam=? OR email=?;",
                [usernameInput.value, emailInput.value]
            );
            // if statement that checks if variable data has any values
            if (!data.length) {
                console.log("No data!");
                status = false;
            } else { // else statement for when variable data has values
                console.log("There is data.");
                console.log(data[0].idAccount);
                //console.log(data.length);
                //FYSCloud.Session.set(emailInput.value, data[0].idAccount);
            }
            return status;
        } catch (error) {
            return null;
        }
    }
});