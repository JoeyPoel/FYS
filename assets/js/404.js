document.addEventListener('DOMContentLoaded', () => {

    FYSCloud.API.configure({
        url: "https://api.fys.cloud",
        apiKey: "fys_is101_4.kQepJlZ8TUMLReYA",
        database: "fys_is101_4_live",
        environment: "mockup"
    });

    const form = document.querySelector('#login-register-form');
    const imageInput = document.getElementById("fileUpload");

    form.addEventListener('submit', async (event) => {
        console.log("Start transaction");
        // Upload file
        await FYSCloud.Utils
            .getDataUrl(document.querySelector("#fileUpload"))
            .then(function (data) {
                FYSCloud.API.uploadFile(
                    data.fileName,
                    data.url, true // data.url under ~500kb will work otherwise error due to slow network traffic (in API)
                ).then(function (data) {
                    console.log(data);
                    console.log("Succes!");
                }).catch(function (reason) {
                    console.log(reason);
                    console.log("Error!");
                });
            }).catch(function (reason) {
                console.log(reason);
                console.log("Failed! No file selected.");
            });

        await FYSCloud.Utils.fetchBlob(document.querySelector("#fileUpload")).then(
            (result) => {
                console.log("getimage:")
                console.log(result);
            }
        )
    });
    // Show image
    imageInput.addEventListener('change', (event) => {
        FYSCloud.Utils
            .getDataUrl("#fileUpload")
            .then(function (data) {
                if (data.isImage) {
                    document.getElementById("imagePreview").src = data.url;
                    console.log(data);
                    console.log(data.url);
                    console.log(data.fileName);
                    console.log(Object.values(data)); // {one: '1'} -> returns '1'
                    let promise = FYSCloud.API.listDirectory();
                    console.log(promise);
                    console.log("Success!");
                }
            }).catch(function (reason) {
            console.log(reason);
            console.log("Error!");
        });
    });
    // Show list/array with the file names
    let promise = FYSCloud.API.listDirectory();
    console.log(promise);
    promise.then(
        (result) => {
            console.log(result);
            //console.log(result[0]); // First index of array
        }
    );
    //FYSCloud.API.deleteFile("Bugatti.jpg");
    //console.log(FYSCloud.API.fileExists("Bugatti.jpg"));
    // Get URL
    // FYSCloud.Utils
    //     .getDataUrl("#fileUpload")
    //     .then(function(data) {
    //         console.log(data);
    //         console.log("Success!");
    //     })
    //     .catch(function(reason) {
    //         console.log(reason);
    //         console.log("Error!");
    //     });
});