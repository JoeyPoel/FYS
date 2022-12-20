//Over pagina scroll
const boxes = document.querySelectorAll('.info');

window.addEventListener('scroll', checkInfo);

checkInfo();

function checkInfo() {
    const triggerBottom = window.innerHeight / 5 * 4;

    boxes.forEach((info) => {
        const boxTop = info.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            info.classList.add('appear');
        } else {
            info.classList.remove('appear')
        }
    })
}

