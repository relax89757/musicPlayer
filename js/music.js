var  musicList = [
    {
    title: '故意',
    artist: '王啸坤',
    album: '王啸坤',
    cover: 'img/4.jpg',
    mp3: 'mp3/王啸坤 - 故意.mp3',
    ogg: ''
    },
    {
    title: '男孩别哭',
    artist: '海龟先生',
    album: '海龟先生',
    cover:'img/1.jpg',
    mp3: 'mp3/海龟先生 - 男孩别哭.mp3',
    ogg: ''
    },
    {
    title: '不搭',
    artist: '李荣浩',
    album: '李荣浩',
    cover: 'img/2.jpg',
    mp3: 'mp3/李荣浩 - 不搭.mp3',
    ogg: ''
    },
    {
    title: '克卜勒',
    artist: '孙燕姿',
    album: '克卜勒',
    cover: 'img/3.jpg',
    mp3: 'mp3/孙燕姿 - 克卜勒.mp3',
    ogg: ''
    },
    {
    title: '盛夏光年',
    artist: '五月天',
    album: 'your legend~燃ゆる...',
    cover: 'img/5.jpg',
    mp3: 'mp3/五月天 - 盛夏光年.mp3',
    ogg: ''
    },
    {
    title: '夜访吸血鬼',
    artist: '五月天',
    album: '后青春期的诗',
    cover: 'img/6.jpg',
    mp3: 'mp3/五月天 - 夜访吸血鬼.mp3',
    ogg: ''
    },
    {
    title: '献世',
    artist: '陈小春',
    album: '夜生活',
    cover: 'img/7.jpg',
    mp3: 'mp3/陈小春 - 献世.mp3',
    ogg: ''
    },
    {
    title: '易燃易爆炸',
    artist: '陈粒',
    album: '如也',
    cover: 'img/8.jpg',
    mp3: 'mp3/陈粒 - 易燃易爆炸.mp3',
    ogg: ''
    },
    ];

var $ = function(el){
  return document.querySelector(el);
}

var lists  = $('.lists'),
    cover  = $('.cover img'),
    title = $('.tag>strong'),
    artist = $('.artist'),
    album = $('.album'),
    playBtn = $('.play'),
    pauseBtn = $('.icon-pause'),
    preBtn = $('.icon-backward'),
    nextBtn = $('.icon-forward'),
    volumeBtn = $('.volume-btn'),
    refreshBtn = $('.refresh'),
    randomBtn = $('.random'),
    curtime = $('.curtime'),
    endtime = $('.endtime'),
    progress = $('.progress-sider'),
    progressShuffle = $('.progress-shuffle'),
    progressCircle = $('.progress-circle'),
    volumeSider = $('.volume-sider'),
    volumeShuffle = $('.volume-shuffle'),
    volumeCircle = $('.volume-circle');

// function musicBox (target){
    //     this.init(target); //初始化
    //     this.render();
    //     this.updateProgress();
    //     this.bind();
    // }    

    // musicBox.prototype = {
    //     init: function(target){
    //         this.target = target;
    //         this.repeat = localStorage.repeat || 0;
    //         this.shuffle = localStorage.shuffle || 'false';
    //         this.continous = true;
    //         this.autoplay = true;
    //     },
    //     render: function(i){
    //         var myAudio = new Audio();
    //         myAudio.src = './mp3/' + musicList[i].artist + ' - ' +musicList[i].title + '.mp3';
    //         title.innerHTML = musicList[i].title;
    //         artist.innerHTML = musicList[i].artist;
    //         album.innerHTML = musicList[i].album;
    //         control.appendChild(myAudio);
    //     }
    // }
    
    myAudio = new Audio();
    myAudio.autoplay = true;
    myAudio.volume = 0.1;
    var musicIndex = 0;
    
    loadMusic(musicList[musicIndex]);
    loadList(musicList);
    getLis(musicIndex);


    function loadMusic(songObj){ 
        myAudio.src = './mp3/' + songObj.artist + ' - ' +songObj.title + '.mp3';
        cover.src = songObj.cover;
        title.innerHTML = songObj.title;
        artist.innerHTML = songObj.artist;
        album.innerHTML = songObj.album;
    }    



    function nextMusic(){
        var randomIcon = randomBtn.querySelector('i');

        if(randomIcon.classList.contains('selected')){
            random();
        }else{
            musicIndex++;
            musicIndex = musicIndex % musicList.length;
        }
        loadMusic(musicList[musicIndex]);
        getLis(musicIndex);
        var icon = playBtn.querySelector('i');
        icon.className = 'icon-pause';
    }

    function preMusic(){
        musicIndex--;
        musicIndex = (musicIndex + musicList.length) % musicList.length;
        loadMusic(musicList[musicIndex]);
        getLis(musicIndex);
        var icon = playBtn.querySelector('i');
        icon.className = 'icon-pause';
    }

    playBtn.onclick = function(){
        var icon = this.querySelector('i');
        icon.classList.contains('icon-play') ? myAudio.play() : myAudio.pause();
        icon.classList.toggle('icon-play');
        icon.classList.toggle('icon-pause');
    }

    preBtn.onclick = preMusic;
    nextBtn.onclick = nextMusic;
    myAudio.onended = nextMusic;

    myAudio.onplaying = function(){
        timer = setInterval(function(){
            updateProgress();
        },1000)
    }

    myAudio.onpause = function(){
        clearInterval(timer);
    }

    volumeBtn.onclick = function(){
        var icon = this.querySelector('i');
        var volume = volumeSider.getAttribute('data-volume');
        if(icon.classList.contains('icon-volume-up')){
            
            // volumeSider.setAttribute('data-volume')
            myAudio.volume = 0;
            volumeShuffle.style.width = 0;
            volumeCircle.style.left = 0;
        }else{
            
            myAudio.volume = volume;
            volumeShuffle.style.width = volume*100 + '%';
            volumeCircle.style.left =  volume*100 - 1 + '%';;
        }

        icon.classList.toggle('icon-volume-up');
        icon.classList.toggle('icon-volume-off');

    }

    refreshBtn.onclick = function(){
        this.querySelector('i').classList.toggle('selected');
        myAudio.loop = true;
    }

    randomBtn.onclick = function(){
        this.querySelector('i').classList.toggle('selected');
        random();
        
    }

    function random(){
        var idx = Math.floor(Math.random()*musicList.length)+1;
        musicIndex = musicIndex == idx ? idx+1 : idx;
        return musicIndex;
    }


    progress.addEventListener('click', clickProgress, false);

    volumeSider.addEventListener('click', clickVolume, false);

    progressCircle.addEventListener('mousedown', progressSlide,false);

    // volumeCircle.addEventListener('mousedown', volumeSlide,false);

    function progressSlide(e){
        e.preventDefault();
        // var slider = e.target.parentNode;
        document.onmousemove = function (e) {
            // console.log('mousemove');
            var disX = e.clientX - progress.offsetLeft;
            var percent = disX  / parseInt(getComputedStyle(progress).width);
            // console.log(disX, percent);
            myAudio.currentTime = myAudio.duration * percent;
            progressShuffle.style.width = percent*100 + '%';
            progressCircle.style.left = percent*100 - 2 + '%';
            return myAudio.currentTime;
        }

        document.onmouseup = function(){
            // console.log('mousestop');
            // console.log(myAudio.currentTime,111);
            document.onmousemove = '';
            document.onmouseup = '';
            // document.onmouseup = null;
            // console.log(myAudio.currentTime,222); 
        }
         
        // return myAudio.currentTime;    
    }

    // function volumeSlide(e){
    //     e.preventDefault();
    //     // var slider = e.target.parentNode;
    //     document.onmousemove = function (e) {
    //         // console.log('mousemove');
    //         var disX = e.clientX - volumeSider.offsetLeft;
    //         var percent = disX  / parseInt(getComputedStyle(volumeSider).width);
    //         // console.log(disX, percent);
    //         // myAudio.currentTime = myAudio.duration * percent;
    //         volumeShuffle.style.width = percent*100 + '%';
    //         volumeCircle.style.left = percent*100 - 2 + '%';
    //         return myAudio.currentTime;
    //     }

    //     document.onmouseup = function(){
    //         // console.log('mousestop');
    //         // console.log(myAudio.currentTime,111);
    //         document.onmousemove = '';
    //         document.onmouseup = '';
    //         // document.onmouseup = null;
    //         // console.log(myAudio.currentTime,222); 
    //     }
         
    //     // return myAudio.currentTime;    
    // }

    // function throttle(fn,delay,atlast){
    //         startTime = new Date();
    //         return function(){
    //             var self = this,
    //                 args = arguments;
    //             curTime = new Date();
    //             if(curTime-startTime >= atlast){
    //                 fn.apply(self,args);
    //                 startTime = curTime;
    //             }else{
    //                 timer = setTimeout(fn,delay)  
    //             }
    //         }
    //     }

    function setProgress(val){
        var percent = val / myAudio.duration;
    
        // myAudio.currentTime = myAudio.duration * percent;
        progressShuffle.style.width = percent*100 + '%';
        progressCircle.style.left = percent*100 - 2 + '%';
    }
    function clickProgress(e){
            var disX = e.clientX - progress.offsetLeft;
            var percent = disX  / parseInt(getComputedStyle(progress).width);
            // console.log(disX, percent);
            myAudio.currentTime = myAudio.duration * percent;
            progressShuffle.style.width = percent*100 + '%';
            progressCircle.style.left = percent*100 - 2 + '%';
    }

    function clickVolume(e){
        var percent = e.offsetX / parseInt(getComputedStyle(this).width);
        myAudio.volume = percent;
        volumeSider.setAttribute('data-volume',percent);
        volumeShuffle.style.width = percent*100 + '%';
        volumeCircle.style.left = percent*100 - 1 + '%';
        
     }

    function updateProgress(){
        // var percent = (myAudio.currentTime/myAudio.duration)*100;
        // progressShuffle.style.width = percent + '%';
        // progressCircle.style.left = percent - 2 + '%';
        setProgress(myAudio.currentTime);
        curtime.innerHTML = getTime(myAudio.currentTime);
        endtime.innerHTML = 'ALL:' + getTime(myAudio.duration);
    }

    function getTime(time){
        var min = parseInt(time/60),
            seconds = parseInt(time%60) + '';
        seconds = seconds.length == 2 ? seconds : '0' + seconds;
        fullTime = min + ':'  + seconds;    
        return fullTime;
    }

    function loadList(musicList){
        var tpl = '';
        tpl += '<ul>';
        
        for (var j = 0; j < musicList.length; j++) {
            tpl += '<li data=' + j + '><i class="icon-volume-up"></i>'+ musicList[j].artist
            + ' - ' + musicList[j].title + '</li>';
        }

        tpl += '</ul>';

        lists.innerHTML = tpl;   
    }

    function getLis(idx){
        var idx = idx || 0;
        var lis = lists.querySelectorAll('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('playing');
            lis[idx].classList.add('playing');
        }
    }
    

    lists.addEventListener('click', function(e){
        if(e.target.tagName.toLowerCase() === 'li'){
            musicIndex = e.target.getAttribute('data');
            
            getLis(musicIndex);
            loadMusic(musicList[musicIndex]);
        }
    });

    function getMusic(callback){
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'music.json', ture);
        xhr.send();
        xhr.onload = function(){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                callback(JSON.parse(xhr.responseText))
            }
        }
    }
