function openDossier() {
    const accessScreen = document.getElementById("accessScreen");
    const dossier = document.getElementById("dossier");

    accessScreen.style.opacity = "0";

    setTimeout(() => {
        accessScreen.style.display = "none";
        dossier.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 1000);
}


function showSecret() {
    const secretMessage = document.getElementById("secretMessage");

    if (secretMessage.style.display === "block") {
        secretMessage.style.display = "none";
    } else {
        secretMessage.style.display = "block";
        createHearts();
        secretMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


/* =========================
   СЕРДЕЧКИ
========================= */

function createHearts() {
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-30px";
        heart.style.fontSize = Math.random() * 20 + 15 + "px";
        heart.style.zIndex = "10000";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        const duration = Math.random() * 3 + 3;

        heart.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform: `translateY(-110vh) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration * 1000,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
}


/* =========================
   ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ
========================= */

window.addEventListener("load", () => {
    const title = document.querySelector(".access-box h1");
    if (!title) return;

    const originalText = title.textContent;
    title.textContent = "";

    let i = 0;
    const typing = setInterval(() => {
        title.textContent += originalText[i];
        i++;
        if (i >= originalText.length) {
            clearInterval(typing);
        }
    }, 70);
});


/* =========================
   ЭФФЕКТ ПРИ ПРОКРУТКЕ
========================= */

window.addEventListener("scroll", () => {
    const elements = document.querySelectorAll(".fact, .evidence-photo, .wanted");

    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 80) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
});


/* =========================
   АНИМАЦИЯ "МАТРИЦА" (ЦИФРЫ НА ФОНЕ)
========================= */

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '0123456789';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0'; // Зеленый цвет цифр
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);