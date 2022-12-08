//Over pagina scroll
const boxes = document.querySelectorAll('.info');

window.addEventListener('scroll', checkInfo);

checkInfo();

function checkInfo() {
    const triggerBottom = window.innerHeight / 5 * 4;

    boxes.forEach((info) => {
        const boxTop = info.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            info.classList.add('show');
        } else {
            info.classList.remove('show')
        }
    })
}

// Fade-in van info pagina
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -150px 0px"
};

const appearOnScroll = new IntersectionObserver(function (
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});