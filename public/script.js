console.log("hello world");

let songIndex = 0;
let audioElement = new Audio('SONGS/1.mp3');
let mainPlay = document.getElementById('mainPlay');
let progressBar = document.getElementById('progress_bar');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songss = [
    {songName: "295", filePath: "SONGS/1.mp3", coverPath: "SCOVERS/s1.jfif"},
    {songName: "East side flow", filePath: "SONGS/2.mp3", coverPath: "SCOVERS/s2.jpg"},
    {songName: "Edamame", filePath: "SONGS/3.mp3", coverPath: "SCOVERS/s3.jfif"},
    {songName: "Dilli Waali Baatcheet", filePath: "SONGS/4.mp3", coverPath: "SCOVERS/s4.jfif"},
    {songName: "Trap Munde", filePath: "SONGS/5.mp3", coverPath: "SCOVERS/s5.jpg"},
    {songName: "Desi Dan Bilzerian", filePath: "SONGS/6.mp3", coverPath: "SCOVERS/s6.jpg"},
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songss[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songss[i].songName;
})

// let s1 = new Audio('295_1.mp3');
// let s2 = new Audio('bbno-Ft-Rich-Brian-edamame.mp3');
// let s3 = new Audio('East Side Flow - Sidhu Moose Wala.mp3');


//play/pause onClick
mainPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        console.log('in the main play event listener');
        mainPlay.classList.remove('fa-circle-play');
        mainPlay.classList.add('fa-circle-pause');
        allPlays();
    }
    else{
        audioElement.pause();
        mainPlay.classList.add('fa-circle-play');
        mainPlay.classList.remove('fa-circle-pause');
        allPlays();
    }
})

// event listeners

audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update progress bar;
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () =>{
    audioElement.currentTime = progressBar.value*audioElement.duration/100;
})



// audioElement.muted = true;l
// audioElement.play();
const allPlays = ()=>{
    Array.from(document.getElementsByClassName('songPlayBtn')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
    
}

Array.from(document.getElementsByClassName('songPlayBtn')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        allPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `SONGS/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        mainPlay.classList.remove('fa-circle-play');
        mainPlay.classList.add('fa-circle-pause');
    })
    document.getElementById('nextSong').addEventListener('click', ()=>{
        if(songIndex<=0){
            songIndex = 0;
        }
        else{
            songIndex = songIndex - 1;
        }
        audioElement.src = `SONGS/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        mainPlay.classList.remove('fa-circle-play');
        mainPlay.classList.add('fa-circle-pause');
    });
    document.getElementById('previousSong').addEventListener('click', ()=>{
        if(songIndex>=5){
            songIndex = 0;
        }
        else{
            songIndex = songIndex + 1;
        }
        audioElement.src = `SONGS/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        mainPlay.classList.remove('fa-circle-play');
        mainPlay.classList.add('fa-circle-pause');
    });
});