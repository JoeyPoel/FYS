
function bruh() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function gegevens() {
    document.getElementById('gegevens').style.display = 'block';
    document.getElementById('vakantie').style.display = 'none';
    document.getElementById('over').style.display = 'none';

}

function vakantie() {
    document.getElementById('vakantie').style.display = 'block';
    document.getElementById('over').style.display = 'none';
    document.getElementById('gegevens').style.display = 'none';

}

function over() {
    document.getElementById('over').style.display = 'block';
    document.getElementById('vakantie').style.display = 'none';
    document.getElementById('gegevens').style.display = 'none';

}