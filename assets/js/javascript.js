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

    // Profielfoto upload
    async function handleImageUpload() {

        let image = document.getElementById("profielFoto").files[0];

        let reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("display-image").src = e.target.result;
        }

        reader.readAsDataURL(image);
    }
});


