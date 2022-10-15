// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const currentTime = $('.current-time')
const dutationTime = $('.duration-time')

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Yêu Nhau Nhé Bạn Thân",
      singer: "Phạm Đình Thái Ngân",
      path: "./assets/music/Yeu-Nhau-Nhe-Ban-Than.mp3",
      image: "./assets/img/yeu-nhau-nhe-ban-than.jpeg"
    },
    {
      name: "Dĩ Vãng Nhạt Nhoà",
      singer: "Hà Nhi",
      path: "./assets/music/Di-Vang-Nhat-Nhoa.mp3",
      image: "./assets/img/Di-Vang-Nhat-Nhoa.jpeg"
    },
    {
      name: "Khác Biệt To Lớn Hơn",
      singer: "Trịnh Thăng Bình - Liz Kim Cương",
      path: "./assets/music/khac-biet-to-lon-hon.mp3",
      image: "./assets/img/khac-biet-to-lon-hon.jpeg"
    },
    {
      name: "Khác Biệt To Lớn",
      singer: "Trịnh Thăng Bình - Liz Kim Cương",
      path: "./assets/music/khac-biet-to-lon.mp3",
      image: "./assets/img/khac-biet-to-lon.jpeg"
    },
    {
      name: "Rồi Nâng Cái Ly",
      singer: "Út Nhị Mino",
      path: "./assets/music/roi-nang-cai-ly.mp3",
      image: "./assets/img/roi-nang-cai-ly.jpeg"
    },
    {
      name: "Xin Má Rước Dâu",
      singer: "Diệu Kiên",
      path: "./assets/music/xin-ma-ruoc-dau.mp3",
      image: "./assets/img/xin-ma-ruoc-dau.webp"
    },
    {
      name: "Đừng Chờ Anh Nữa",
      singer: "Tăng Phúc",
      path: "./assets/music/dung-cho-anh-nua.mp3",
      image: "./assets/img/dung-cho-anh-nua.jpeg"
    },
    {
      name: "Waiting For You",
      singer: "Mono",
      path: "./assets/music/waiting-for-you.mp3",
      image: "./assets/img/waiting-for-you.jpeg"
    },
    {
      name: "Dạ Vũ",
      singer: "Tăng Duy Tân",
      path: "./assets/music/Da-Vu.mp3",
      image: "./assets/img/Da-Vu.jpeg"
    },
    {
      name: "Bên Trên Tầng Lầu",
      singer: "Tăng Duy Tân",
      path: "./assets/music/ben-tren-tang-lau.mp3",
      image: "./assets/img/ben-tren-tang-lau.jpeg"
    },
    {
      name: "Suy Nghĩ Trong Anh",
      singer: "Khắc Việt",
      path: "./assets/music/Suy-Nghi-Trong-Anh.mp3",
      image: "./assets/img/Suy-Nghi-Trong-Anh.jpeg"
    },
    {
      name: "Yêu Lại Từ Đầu",
      singer: "Khắc Việt",
      path: "./assets/music/Yeu-Lai-Tu-Dau-Khac-Viet.mp3",
      image: "./assets/img/Yeu-Lai-Tu-Dau-Khac-Viet.jpeg"
    },
    {
      name: "Cô Đơn Dành Cho Ai",
      singer: "Hồ Phi Nal",
      path: "./assets/music/co-don-danh-cho-ai.mp3",
      image: "./assets/img/co-don-danh-cho-ai.jpeg"
    },
    {
      name: "Kẻ Điên Tin Vào Tình Yêu",
      singer: "Lil Z",
      path: "./assets/music/Ke-Dien-Tin-Vao-Tinh-Yeu.mp3",
      image: "./assets/img/Ke-Dien-Tin-Vao-Tinh-Yeu.jpeg"
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
        progress.value = progressPercent;

        // Thay đổi time hiệp tại
        var targetCurrentTime = Math.floor(audio.currentTime); //thời gian hiện tại bài hát đang chạy
        var minute = Math.floor(targetCurrentTime/60); // số phút
        var second = targetCurrentTime % 60;
        if (second < 10){
          second = '0' + second;
        }
        currentTime.textContent = '0' + minute + ':' + second

        // hiển thị tổng thời gian song
        var targetDurationTime = Math.floor(audio.duration); //thời gian hiện tại bài hát đang chạy
        var minute1 = Math.floor(targetDurationTime/60); // số phút
        var second1 = targetDurationTime % 60;
        if (second1 < 10){
          second1 = '0' + second1;
        }else{
          second1 = ''+ second1
        }
        dutationTime.textContent = '0' + minute1 + ':' + second1;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    if (this.currentIndex === 0) {
      document.documentElement.scrollTop = 0
    };
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 100);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex && newIndex < this.songs.length);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
