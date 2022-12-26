document.getElementById('sendEmail').onclick= async function sendEmail(){
    let yourName = document.getElementById('yourName').value;
    let yourEmail = document.getElementById('yourEmail').value;
    let subject = document.getElementById('subject').value;
    let text = document.getElementById('text').value;

    await FYSCloud.API.sendEmail({
        from: {
            name: yourName,
            address: yourEmail
        },
        to: [
            {
                name: "Joey",
                address: "joey.van.der.poel@hva.nl"
            }
        ],
        subject: subject,
        html: text + "<p>Om antwoord hier op te geven mail: </p>" + yourEmail
    }).then(function(data) {
        console.log(data);
    }).catch(function(reason) {
        console.log(reason);
    });
    window.location.reload();
    window.alert("Email is succesvol verstuurd")
}
