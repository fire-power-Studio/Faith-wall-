/* =========================================================
   FAITHWALLS — CHRISTIAN WALLPAPER STUDIO
   Built from the original Gradient Wallpaper Studio structure.
   ========================================================= */

const IMAGES = [
    { name: "The Living One", file: "images/wallpaper-01-living-one.jpg" },
    { name: "My Light and Salvation", file: "images/wallpaper-02-light-and-salvation.jpg" },
    { name: "The Angel of the LORD", file: "images/wallpaper-03-angel-of-the-lord.jpg" },
    { name: "The Fourth Is Like the Son of God", file: "images/wallpaper-04-fourth-in-fire.jpg" },
    { name: "Giant Slayer", file: "images/wallpaper-05-giant-slayer.jpg" },
    { name: "Then the Fire of the LORD Fell", file: "images/wallpaper-06-fire-of-the-lord.jpg" },
    { name: "A Pillar of Fire by Night", file: "images/wallpaper-07-pillar-of-fire.jpg" },
    { name: "Overflows", file: "images/wallpaper-08-overflows.jpg" },
    { name: "Greater Than He That Is in the World", file: "images/wallpaper-09-greater-is-he.jpg" },
    { name: "Walls of Water", file: "images/wallpaper-10-walls-of-water.jpg" },
    { name: "The Great Dragon Cast Out", file: "images/wallpaper-11-great-dragon-cast-out.jpg" },
    { name: "Supernatural Speed", file: "images/wallpaper-12-supernatural-speed.jpg" },
    { name: "Defeating the Roaring Lion", file: "images/wallpaper-13-roaring-lion.jpg" },
    { name: "Peace Be Still", file: "images/wallpaper-14-peace-be-still.jpg" },
    { name: "Heavenly Guardians", file: "images/wallpaper-15-heavenly-guardians.jpg" }
];

const VIDEOS = [
    { name: "Daniel 10: The Unseen War", file: "videos/live-01-daniel-unseen-war.mp4" },
    { name: "I Will Fear No Evil", file: "videos/live-02-fear-no-evil.mp4" },
    { name: "Pierced by Divine Light", file: "videos/live-03-divine-light.mp4" },
    { name: "Purged by Fire", file: "videos/live-04-purged-by-fire.mp4" },
    { name: "The Whole Armour of God", file: "videos/live-05-armour-of-god.mp4" },
    { name: "The Gate of Heaven", file: "videos/live-06-gate-of-heaven.mp4" },
    { name: "God Called Unto Him", file: "videos/live-07-god-called-unto-him.mp4" },
    { name: "The Angel in the Way", file: "videos/live-08-angel-in-the-way.mp4" },
    { name: "Destroy Their Altars", file: "videos/live-09-destroy-their-altars.mp4" }
];

const PROMPTS = [
    "A majestic angel standing beneath heavenly golden light, cinematic Christian art, peaceful atmosphere, vertical phone wallpaper",
    "Jesus walking on water at sunrise, dramatic clouds, radiant light, biblical cinematic artwork, vertical wallpaper",
    "The empty tomb at dawn, rays of heavenly light, peaceful Christian scene, cinematic vertical wallpaper",
    "The three Hebrew men standing safely in the fiery furnace with a divine fourth figure, Daniel 3, cinematic art",
    "Moses before the burning bush, holy light in the wilderness, reverent biblical artwork, vertical phone wallpaper",
    "The Lion of Judah beneath a golden sky, powerful Christian symbolism, cinematic vertical wallpaper"
];

const state = {
    selectedImage: null,
    selectedVideo: null,
    creatorImageOne: null,
    creatorImageTwo: null,
    position: "center"
};

const video = document.getElementById("wallpaperVideo");
const canvas = document.getElementById("wallpaperCanvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("wallpaperImage");

const imageButtons = document.getElementById("imageButtons");
const videoButtons = document.getElementById("videoButtons");
const phoneGlow = document.getElementById("phoneGlow");
const previewCaption = document.getElementById("previewCaption");

const verseInput = document.getElementById("verseInput");
const referenceInput = document.getElementById("referenceInput");
const previewVerse = document.getElementById("previewVerse");
const previewReference = document.getElementById("previewReference");

const imageOneInput = document.getElementById("imageOneInput");
const imageTwoInput = document.getElementById("imageTwoInput");
const createButton = document.getElementById("createButton");

const promptList = document.getElementById("promptList");
const toast = document.getElementById("toast");

const wallpaperSheet = document.getElementById("wallpaperSheet");
const setWallpaperButton = document.getElementById("setWallpaperButton");
const cancelSheet = document.getElementById("cancelSheet");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.faithToastTimer);
    window.faithToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function createImageButtons() {
    imageButtons.innerHTML = "";

    IMAGES.forEach((wallpaper, index) => {
        const button = document.createElement("button");
        button.className = "image-button";
        button.dataset.index = index;

        const img = document.createElement("img");
        img.src = wallpaper.file;
        img.alt = wallpaper.name;
        img.loading = "lazy";

        const label = document.createElement("span");
        label.className = "button-label";
        label.textContent = wallpaper.name;

        button.appendChild(img);
        button.appendChild(label);

        button.addEventListener("click", () => selectImage(index));
        imageButtons.appendChild(button);
    });
}

function createVideoButtons() {
    videoButtons.innerHTML = "";

    VIDEOS.forEach((wallpaper, index) => {
        const button = document.createElement("button");
        button.className = "video-button";
        button.dataset.index = index;

        const preview = document.createElement("video");
        preview.src = wallpaper.file;
        preview.muted = true;
        preview.loop = true;
        preview.autoplay = true;
        preview.playsInline = true;
        preview.preload = "metadata";

        const label = document.createElement("span");
        label.className = "button-label";
        label.textContent = wallpaper.name;

        button.appendChild(preview);
        button.appendChild(label);

        button.addEventListener("click", () => selectVideo(index));
        videoButtons.appendChild(button);
    });
}

function clearSelections() {
    document.querySelectorAll(".image-button, .video-button")
        .forEach(button => button.classList.remove("active"));
}

function selectImage(index) {
    if (!IMAGES[index]) return;

    state.selectedImage = index;
    state.selectedVideo = null;
    clearSelections();

    document.querySelector(`.image-button[data-index="${index}"]`)
        ?.classList.add("active");

    video.pause();
    video.removeAttribute("src");
    video.load();

    video.style.display = "none";
    canvas.style.display = "none";
    image.style.display = "block";

    image.src = IMAGES[index].file;

    previewCaption.textContent =
        `${IMAGES[index].name} — Christian wallpaper`;

    phoneGlow.style.background =
        "radial-gradient(circle, rgba(216,188,106,.25), transparent 68%)";
}

function selectVideo(index) {
    if (!VIDEOS[index]) return;

    state.selectedVideo = index;
    state.selectedImage = null;
    clearSelections();

    document.querySelector(`.video-button[data-index="${index}"]`)
        ?.classList.add("active");

    image.style.display = "none";
    canvas.style.display = "none";
    video.style.display = "block";
    video.style.visibility = "visible";
    video.controls = false;

    video.pause();
    video.removeAttribute("src");
    video.load();
    video.src = VIDEOS[index].file;
    video.load();

    const startSelectedVideo = () => {
        video.currentTime = 0;
        const promise = video.play();
        if (promise) {
            promise.catch(() => {
                video.controls = true;
            });
        }
    };

    if (video.readyState >= 2) {
        startSelectedVideo();
    } else {
        video.addEventListener("loadeddata", startSelectedVideo, { once: true });
    }

    previewCaption.textContent =
        `${VIDEOS[index].name} — live Christian wallpaper`;
}

function updateVerse() {
    previewVerse.textContent =
        verseInput.value.trim() || "Be strong and courageous.";

    previewReference.textContent =
        referenceInput.value.trim() || "Joshua 1:9";
}

verseInput.addEventListener("input", updateVerse);
referenceInput.addEventListener("input", updateVerse);

function readImage(file, callback) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = event => {
        const img = new Image();

        img.onload = () => callback(img);
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

imageOneInput.addEventListener("change", () => {
    readImage(imageOneInput.files[0], img => {
        state.creatorImageOne = img;
        showToast("First image loaded");
    });
});

imageTwoInput.addEventListener("change", () => {
    readImage(imageTwoInput.files[0], img => {
        state.creatorImageTwo = img;
        showToast("Second image loaded");
    });
});

document.querySelectorAll("[data-position]").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll("[data-position]")
            .forEach(item => item.classList.remove("active"));

        button.classList.add("active");
        state.position = button.dataset.position;
    });
});

function drawCover(ctx, img, x, y, width, height) {
    const scale = Math.max(width / img.width, height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;

    ctx.drawImage(
        img,
        x + (width - w) / 2,
        y + (height - h) / 2,
        w,
        h
    );
}

function createChristianWallpaper() {
    if (!state.creatorImageOne && !state.creatorImageTwo) {
        showToast("Upload at least one image first");
        return;
    }

    const W = 1080;
    const H = 1920;

    canvas.width = W;
    canvas.height = H;

    const first = state.creatorImageOne || state.creatorImageTwo;
    const second = state.creatorImageTwo || state.creatorImageOne;

    drawCover(ctx, first, 0, 0, W, H);

    ctx.fillStyle = "rgba(0,0,0,.25)";
    ctx.fillRect(0, 0, W, H);

    if (second && second !== first) {
        ctx.save();

        ctx.globalAlpha = .45;
        ctx.globalCompositeOperation = "screen";

        drawCover(ctx, second, 0, 0, W, H);

        ctx.restore();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, "rgba(0,0,0,.05)");
    gradient.addColorStop(.55, "rgba(0,0,0,.15)");
    gradient.addColorStop(1, "rgba(0,0,0,.75)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,.9)";
    ctx.shadowBlur = 18;

    const verse = verseInput.value.trim() || "Be strong and courageous.";
    const reference = referenceInput.value.trim() || "Joshua 1:9";

    let y;

    if (state.position === "top") y = 350;
    else if (state.position === "bottom") y = 1510;
    else y = 950;

    ctx.font = "bold 58px Arial";
    wrapText(ctx, `"${verse}"`, W / 2, y, 900, 72);

    ctx.shadowBlur = 10;
    ctx.fillStyle = "#d8bc6a";
    ctx.font = "bold 34px Arial";
    ctx.fillText(reference, W / 2, y + 180);

    image.style.display = "none";
    video.style.display = "none";
    canvas.style.display = "block";

    state.selectedImage = null;
    state.selectedVideo = null;
    clearSelections();

    previewCaption.textContent = "Your custom Christian wallpaper";

    showToast("Wallpaper created");
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    const lines = [];

    words.forEach(word => {
        const test = line + word + " ";

        if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line.trim());
            line = word + " ";
        } else {
            line = test;
        }
    });

    if (line) lines.push(line.trim());

    lines.forEach((lineText, i) => {
        ctx.fillText(lineText, x, y + i * lineHeight);
    });
}

createButton.addEventListener("click", createChristianWallpaper);

function downloadCurrent(target) {
    if (state.selectedVideo !== null) {
        const selected = VIDEOS[state.selectedVideo];
        const link = document.createElement("a");

        link.href = selected.file;
        link.download =
            selected.name.replace(/\s+/g, "_").toLowerCase() + ".mp4";

        document.body.appendChild(link);
        link.click();
        link.remove();

        showToast(`${selected.name} downloaded`);
        return;
    }

    if (state.selectedImage !== null) {
        const selected = IMAGES[state.selectedImage];
        const link = document.createElement("a");

        link.href = selected.file;
        link.download =
            selected.name.replace(/\s+/g, "_").toLowerCase() + ".jpg";

        document.body.appendChild(link);
        link.click();
        link.remove();

        showToast(`${selected.name} downloaded`);
        return;
    }

    if (canvas.style.display !== "none") {
        canvas.toBlob(blob => {
            if (!blob) {
                showToast("Could not create wallpaper");
                return;
            }

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `faithwalls-${target}.png`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            // Give the browser time to start the download before releasing the blob URL.
            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
            showToast("Custom wallpaper downloaded");
        }, "image/png");

        return;
    }

    showToast("Select or create a wallpaper first");
}

setWallpaperButton.addEventListener("click", () => {
    wallpaperSheet.classList.add("show");
});

cancelSheet.addEventListener("click", () => {
    wallpaperSheet.classList.remove("show");
});

wallpaperSheet.addEventListener("click", event => {
    if (event.target === wallpaperSheet) {
        wallpaperSheet.classList.remove("show");
    }
});

document.querySelectorAll(".sheet-option").forEach(option => {
    option.addEventListener("click", () => {
        const target = option.dataset.target;

        wallpaperSheet.classList.remove("show");
        downloadCurrent(target);
    });
});

document.querySelectorAll(".story-button").forEach(button => {
    button.addEventListener("click", () => {
        const file = button.dataset.image;
        const verse = button.dataset.verse;
        const reference = button.dataset.reference;

        const index = IMAGES.findIndex(item => item.file === file);

        verseInput.value = verse;
        referenceInput.value = reference;
        updateVerse();

        if (index >= 0) {
            selectImage(index);
        }
    });
});

function createPrompts() {
    promptList.innerHTML = "";

    PROMPTS.forEach(promptText => {
        const prompt = document.createElement("div");

        prompt.className = "prompt";
        prompt.textContent = promptText;

        prompt.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(promptText);
                showToast("Prompt copied");
            } catch {
                showToast("Copy failed");
            }
        });

        promptList.appendChild(prompt);
    });
}

window.addEventListener("resize", () => {
    if (canvas.style.display !== "none" && canvas.width) {
        /* Keep the custom wallpaper canvas intact. */
    }
});

createImageButtons();
createVideoButtons();
createPrompts();
updateVerse();
