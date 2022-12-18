document.addEventListener('DOMContentLoaded', () => {

    FYSCloud.API.configure({
        url: "https://api.fys.cloud",
        apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
        database: "fys_is101_4_live",
        environment: "mockup"
    });

    const form = document.querySelector('#login-register-form');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    form.addEventListener('submit', (event) => {
        validateForm();
        console.log(isFormValid());
        if (isFormValid() == true) {
            form.submit();
            //getData();
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
    // Function with SQL that retrieves data from the database
    async function getData() {
        try {
            const data = await FYSCloud.API.queryDatabase(
                "SELECT * FROM fys_is101_4_live.`account` WHERE email='admin@gmail.com';"
            );
            /* if (data[0].idAccount != 0) {
                return data[0].idAccount;
            } */
            console.log(data[0].idAccount);
            FYSCloud.Session.set(emailInput.value, data[0].idAccount);
            return data;// FYSCloud.Session.set(emailInput.value, data[0].idAccount);
        } catch (error) {
            return null;
        }
    }

    //getData();

    // Remove everything from the session
    FYSCloud.Session.clear();

    let object = FYSCloud.Session.get();

    if (Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype) {
        console.log("Object is empty. Register or login to show object/session data.");
    } else {
        console.log(object); // View object
        console.log(Object.keys(object)); // View object
        //getData(); // Functie wordt aangeroepen
    }
});