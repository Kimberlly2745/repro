const container = document.querySelector(".container"),
    musicImg = container.querySelector(".img-area img"),
    musicName = container.querySelector(".song-details .name"),
    musicArtist = container.querySelector(".song-details .artist"),
    mainAudio = container.querySelector(".main-audio"),
    playpauseBtn = container.querySelector(".play-pause"),
    nextBtn = document.querySelector("#next"),
    prevBtn = document.querySelector("#prev"),
    progressBar = document.querySelector(".progress-bar"),
    songTimer = document.querySelector(".song-timer .current-time"),
    repeatBtn = document.querySelector(".fa-repeat"),
    musicList = document.querySelector(".music-list"),
    openListBtn = document.querySelector(".fa-list"),
    closeListBtn = document.querySelector("#close"),
    listItems = document.querySelectorAll(".music-list ul li");

let musicIndex = 0;
let isPlaying = false;
let isRepeat = false;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(index) {
    musicIndex = index;
    musicName.innerText = allMusic[index].name;
    musicArtist.innerText = allMusic[index].artist;
    musicImg.src = 'imagenes/' + allMusic[index].img + '.jpg';
    mainAudio.src = 'musica/' + allMusic[index].src + '.mp3';
}

function playMusic() {
    container.classList.add("paused");
    playpauseBtn.innerHTML = "<i class='fa fa-pause'></i>";
    mainAudio.play();
    isPlaying = true;
    updateProgressBar();
}

function pauseMusic() {
    container.classList.remove("paused");
    playpauseBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
    mainAudio.pause();
    isPlaying = false;
}

function togglePlayPause() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    const repeatIcon = document.querySelector(".fa-repeat");
    if (isRepeat) {
        repeatIcon.style.color = "#f10404"; // Cambiar color para indicar que está activado
    } else {
        repeatIcon.style.color = "#000000"; // Cambiar color para indicar que está desactivado
    }
}

function nextMusic() {
    musicIndex++;
    if (musicIndex >= allMusic.length) {
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = allMusic.length - 1;
    }
    loadMusic(musicIndex);
    playMusic();
}

function repeatMusic() {
    if (isRepeat) {
        mainAudio.currentTime = 0; // Reinicia la canción al principio
        playMusic(); // Reproduce la canción automáticamente
    }
}

function updateProgressBar() {
    mainAudio.addEventListener('ended', () => {
        repeatMusic(); // Repite la canción al finalizar si la repetición está activa
        nextMusic(); // Reproduce la siguiente canción
    });

    mainAudio.addEventListener('timeupdate', () => {
        const currentTime = mainAudio.currentTime;
        const duration = mainAudio.duration;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = progressPercent + '%';
        updateSongTimer(currentTime, duration);
    });

    // Listener de evento para el clic en la barra de progreso
    progressBar.addEventListener('click', (e) => {
        // Calcula la posición X del clic dentro de la barra de progreso
        const progressBarWidth = progressBar.clientWidth;
        const clickPositionX = e.offsetX;

        // Calcula el tiempo de reproducción correspondiente a la posición del clic
        const duration = mainAudio.duration;
        const newTime = (clickPositionX / progressBarWidth) * duration;

        // Establece la nueva posición de reproducción del audio
        mainAudio.currentTime = newTime;
    });
}

function updateSongTimer(currentTime, duration) {
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (currentSeconds < 10) {
        currentSeconds = '0' + currentSeconds;
    }
    if (durationSeconds < 10) {
        durationSeconds = '0' + durationSeconds;
    }

    songTimer.innerText = currentMinutes + ':' + currentSeconds + ' / ' + durationMinutes + ':' + durationSeconds;
}

function openMusicList() {
    musicList.classList.add("show");
}

function closeMusicList() {
    musicList.classList.remove("show");
}

openListBtn.addEventListener("click", openMusicList);
closeListBtn.addEventListener("click", closeMusicList);

listItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        loadMusic(index);
        playMusic();
        closeMusicList(); // Cerrar la lista después de seleccionar una canción
    });
});

playpauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);
repeatBtn.addEventListener("click", toggleRepeat);

updateProgressBar();