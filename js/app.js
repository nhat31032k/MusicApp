window.addEventListener("load", function () {
  const container = document.querySelector(".container");
  const playerImage = document.querySelector(".player-image");
  // console.log(playerImage);
  const now = document.querySelector(".now");
  const playerName = document.querySelector(".name");
  const playerArtist = document.querySelector(".artist");
  const playerAudio = document.querySelector(".main-audio");
  const playerPlay = document.querySelector(".play");
  const nextBtn = document.querySelector(".next");
  const backBtn = document.querySelector(".back");
  const progressBar = document.querySelector(".progress-bar");
  const progressArea = document.querySelector(".progress-area");
  const musicList = document.querySelector(".music-list");
  const moreMusic = document.querySelector(".more");
  const closeMusic = document.querySelector(".close");

  console.log(playerPlay);
  let musicIndex = 12;
  let playing = true;
  function loadMusic(indexNumb) {
    playerName.innerText = allMusics[indexNumb - 1].name;
    playerArtist.innerText = allMusics[indexNumb - 1].artist;
    //lấy thứ tự ảnh
    playerImage.src = `images/${allMusics[indexNumb - 1].img}.png`;
    //lấy thứ tự nhạc
    playerAudio.src = `songs/${allMusics[indexNumb - 1].audio}.mp3`;
  }
  loadMusic(musicIndex);
  //   playing();
  //playMusic
  function activity() {
    playerPlay.setAttribute("name", "pause-circle-outline");
    playerImage.classList.add("is-playing");
    playerAudio.play();
    now.innerText = "Now Playing";
  }
  function playMusic() {
    if (playing) {
      activity();
      playing = false;
    } else {
      playerPlay.setAttribute("name", "play-circle-outline");
      playerImage.classList.remove("is-playing");
      playerAudio.pause();
      now.innerText = "Now Stop";
      playing = true;
    }
  }
  //play music
  playerPlay.addEventListener("click", playMusic);
  //next music
  function nextMusic() {
    //tằng index
    musicIndex++;
    if (musicIndex > allMusics.length) {
      musicIndex = 1;
    }
    loadMusic(musicIndex);
    activity();
  }
  function backMusic() {
    //tằng index
    musicIndex--;
    if (musicIndex < 1) {
      musicIndex = allMusics.length;
    }
    loadMusic(musicIndex);
    activity();
  }
  nextBtn.addEventListener("click", function () {
    nextMusic();
    playing = true;
  });
  backBtn.addEventListener("click", function () {
    backMusic();
    playing = true;
  });
  playerAudio.addEventListener("ended", function (e) {
    // activity();
    let getName = repeatBtn.getAttribute("name");

    console.log(getName);
    switch (getName) {
      case "repeat":
        nextMusic();
        break;
      case "repeat-one":
        playerAudio.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        activity();
        break;
      case "shuft":
        let randomMusic = Math.floor(Math.random() * allMusics.length + 1);
        do {
          randomMusic = Math.floor(Math.random() * allMusics.length + 1);
        } while (randomMusic == musicIndex);
        musicIndex = randomMusic;
        loadMusic(musicIndex);
        playMusic();
        activity();
        break;
      default:
        break;
    }
  });
  //update progress bar
  playerAudio.addEventListener("timeupdate", (e) => {
    //thời gian hiện tại
    const currentTime = e.target.currentTime;
    //thời gian chạy
    const duration = e.target.duration;
    //tính độ dài
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = container.querySelector(".current-time");
    let musicDuration = document.querySelector(".max-duration");
    playerAudio.addEventListener("loadeddata", () => {
      //update song progress
      let mainAdDuration = playerAudio.duration;
      let totalMin = Math.floor(mainAdDuration / 60);
      let totalSec = Math.floor(mainAdDuration % 60);
      // nếu số giấy nhỏ hơn 10 thì thêm 0 vào trước
      if (totalSec < 10) {
        totalSec = `0${totalSec}`;
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    //update song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    // nếu số giấy nhỏ hơn 10 thì thêm 0 vào trước
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });
  //update progress bar kéo thả
  progressArea.addEventListener("click", (e) => {
    //getting width of progress bar
    let progressWidth = progressArea.offsetWidth;
    //lấy vị trí của theo từng thời gian
    let ClickOffsetx = e.offsetX;
    //tính thời gian tổng của song
    let songDuration = playerAudio.duration;
    playerAudio.currentTime = (ClickOffsetx / progressWidth) * songDuration;
    // playMusic();
  });
  // sự kiện lặp lại,trộn bài hát ngẫu nhiên
  const repeatBtn = document.querySelector(".repeat-plist");
  console.log(repeatBtn);
  repeatBtn.addEventListener("click", (e) => {
    console.log("click");
    let getName = repeatBtn.getAttribute("name");
    console.log(getName);
    switch (getName) {
      case "repeat":
        repeatBtn.setAttribute("name", "repeat-one");
        repeatBtn.setAttribute("class", "fa fa-code-fork");
        break;
      case "repeat-one":
        repeatBtn.setAttribute("name", "shuft");
        repeatBtn.setAttribute("class", "fa fa-random");
        break;
      case "shuft":
        repeatBtn.setAttribute("name", "repeat");
        repeatBtn.setAttribute("class", "fa fa-repeat");
        break;
      default:
        break;
    }
  });
  // show music list
  moreMusic.addEventListener("click", (e) => {
    console.log(e.target);
    musicList.classList.toggle("show");
  });
  closeMusic.addEventListener("click", (e) => {
    musicList.classList.toggle("show");
  });
  //create li tags according to array lenght for list
  const ulTag = document.querySelector("ul");
  console.log(ulTag);
  for (let i = 0; i < allMusics.length; i++) {
    let liTag = `
         <li li-index ="${i + 1}">
                <div class="row">
                    <span>${allMusics[i].name}</span>
                    <p>${allMusics[i].artist}</p>
                </div>
                 <audio class="${allMusics[i].audio}" src="songs/${
      allMusics[i].audio
    }.mp3"></audio>
                <span id="${allMusics[i].audio}" class="audio-duration"></span>
            </li>
        `;
    ulTag.insertAdjacentHTML("beforeend", liTag);
    let audioDuration = document.querySelector("#" + `${allMusics[i].audio}`);
    console.log(audioDuration);
    // console.log(liAudioTag);
    // liAudioTag.addEventListener("loadeddata", () => {
    //   let duration = liAudioTag.duration;
    //   let totalMin = Math.floor(duration / 60);
    //   let totalSec = Math.floor(duration % 60);
    //   // nếu số giấy nhỏ hơn 10 thì thêm 0 vào trước
    //   if (totalSec < 10) {
    //     totalSec = `0${totalSec}`;
    //   }
    //   audioDuration.innerHtml = `${totalMin}:${totalSec}`;
    // });
  }
  let liAudioTag = ulTag.querySelector("li");
  function playingsong() {
    for (let j = 0; j < liAudioTag.length; j++) {
      if (liAudioTag[j].getAttribute("li-index") === musicIndex) {
        liAudioTag[j].classList.add("playing");
      }
      liAudioTag[j].setAttribute("onclick", "clicked");
    }
  }
  playingsong();
  function clicked(e) {
    console.log(e.target);
    let getIndex = e.target.getAttribute("li-index");
    musicIndex = getIndex;
    loadMusic(musicIndex);
    playMusic();
  }
});
