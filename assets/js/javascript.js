document.addEventListener('DOMContentLoaded', () => {





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
});


