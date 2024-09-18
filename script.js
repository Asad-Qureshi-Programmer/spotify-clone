let currentSong = new Audio();

let allSongs = [];
 
let currFolder;

function secondsFormatter(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSec = Math.floor(seconds % 60);

  let formminutes = String(minutes).padStart(2, "0");
  let formsec = String(remainingSec).padStart(2, "0");

  return `${formminutes}:${formsec}`;
}






async function getSongs(folder) {
  currFolder = folder
  let a = await fetch(`/${folder}/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  allSongs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3") || element.href.endsWith(".wav")) {
      allSongs.push(element.href);
    }
  }



  


  let songBar = document.querySelector(".songList").getElementsByTagName("ul")[0]
  songBar.innerHTML = ""


    for (const song of allSongs) {
      // let songBar = document.createElement("div");
      // songBar.className = "mini";
      songBar.innerHTML = songBar.innerHTML + `<li class="mini"> <p class="big">${song
        .split(`/${currFolder}/`)[1]
        .replaceAll("-", " ")
        .replace(".mp3", "")
        .replaceAll("%20", " ")
        .replaceAll("%", "")
        .replace(".wav", "")}</p>
            <p class="small">Play Now</p>
            <div class="btn"><button><img class="invert playit"  src="./resources/playbtn.svg" width="30px" /></button></div> </li>`;
  
  
      
    }
  
    
  
    
    for (let i = 0; i < allSongs.length; i++) {
      document
        .getElementsByClassName("playit")
        [i].addEventListener("click", () => {
          if (currentSong.paused) {
            document.getElementsByClassName("playit")[i].src =
              "./resources/pause in circle.png";
  
            playMusic(allSongs[i]);
          } else {
            currentSong.pause();
            for (let j = 0; j < allSongs.length; j++) {
              document.getElementsByClassName("playit")[j].src =
                "./resources/playbtn.svg";
            }
            play.src = "./resources/play-button.png";
          }
  
          
        });
    }



   
  
}

// HTML audio alement features = src, currentTime, duration, paused, muted, volume
let playMusic = (track, paused = false) => {
  currentSong.src = track;
  if (!paused) {
    currentSong.play();
    play.src = "./resources/pause.png";
  }

  document.querySelector(".songInfo").innerHTML = `<p> ${track
    .split(`/${currFolder}/`)[1]
    .replaceAll("-", " ")
    .replace(".mp3", "")
    .replaceAll("%20", " ")
    .replaceAll("%", " ")
    .replace(".wav", "")} </p>`;
};



async function displayAlbums() {
  let a = await fetch(`/songs/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a")
  // let arr = Array.from(anchors)
  let allfolders
  let cardContainer = document.querySelector(".sectionGallery")

  for (let index = 0; index < anchors.length; index++) {
    let element = anchors[index]

    if (element.href.includes("/songs/")) {
      allfolders = element.href.split("/songs/")[1].replace("/", "")
      
      //get metadata of each folder
      let a = await fetch(`/songs/${allfolders}/info.json`);
      let response = await a.json();
      

      cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${allfolders}" class="album">
            <div class="playAlb">
              <img
                class="playbtn"
                src="./resources/play.png"
                width="35px"
                alt="play"
              />
              <img
                class="albumImg"
                src="./songs/${allfolders}/cover.jpeg"
                width="80px"
                alt=""
              />
            </div>
            <p class="name">${response.title}</p>
            <p class="art">${response.description}</p>
          </div>`


    }
  }




  Array.from(document.getElementsByClassName("album")).forEach(  (album)=>{
    album.addEventListener("click", async item=>{
        // console.log(item.currentTarget.dataset)  
        
  
       await getSongs(`songs/${item.currentTarget.dataset.folder}`); //if no await then print promise:pending
     //currentTarget means, only target the element where event listener is attached (album), no matter which elemnt inside it is clicked
  
       playMusic(allSongs[0])

  })
  
  })


}

displayAlbums()




async function main() {



  // Array.from(document.getElementsByClassName("album")).forEach(  (album)=>{
  //   album.addEventListener("click", async item=>{
  //       // console.log(item.currentTarget.dataset)  
        
  
  //      await getSongs(`songs/${item.currentTarget.dataset.folder}`); //if no await then print promise:pending
  //    //currentTarget means, only target the element where event listener is attached (album), no matter which elemnt inside it is clicked
  
  //      playMusic(allSongs[0])

  // })
  
  // })





// var audio = new Audio(allSongs[0]);

  await getSongs("songs/ncs")
  playMusic(allSongs[0], true)
  


// let songBar = document.querySelector(".songList").getElementsByTagName("ul")[0]
//   for (const song of allSongs) {
//     // let songBar = document.createElement("div");
//     // songBar.className = "mini";
//     songBar.innerHTML = songBar.innerHTML + `<li class="mini"> <p class="big">${song
//       .split(`/${currFolder}/`)[1]
//       .replaceAll("-", " ")
//       .replace(".mp3", "")
//       .replaceAll("%20", " ")
//       .replace(".wav", "")}</p>
//           <p class="small">Play Now</p>
//           <div class="btn"><button><img class="invert playit"  src="./resources/playbtn.svg" width="30px" /></button></div> </li>`;


//     // document.querySelector(".miniscroll").prepend(songBar); 
//   }

  

//   let z;
//   for (let i = 0; i < allSongs.length; i++) {
//     document
//       .getElementsByClassName("playit")
//       [i].addEventListener("click", () => {
//         if (currentSong.paused) {
//           document.getElementsByClassName("playit")[i].src =
//             "./resources/pause in circle.png";

//           playMusic(allSongs[i]);
//         } else {
//           currentSong.pause();
//           for (let j = 0; j < allSongs.length; j++) {
//             document.getElementsByClassName("playit")[j].src =
//               "./resources/playbtn.svg";
//           }
//           play.src = "./resources/play-button.png";
//         }

//         z = i;
//       });
//   }

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "./resources/pause.png";

      let i = allSongs.indexOf(currentSong.src);
      document.getElementsByClassName("playit")[i].src =
        "./resources/pause in circle.png";
    } else {
      currentSong.pause();
      play.src = "./resources/play-button.png";

      for (let ind = 0; ind < allSongs.length; ind++) {
        document.getElementsByClassName("playit")[ind].src =
          "./resources/playbtn.svg";
      }

      let i = allSongs.indexOf(currentSong.src);
      document.getElementsByClassName("playit")[i].src =
        "./resources/playbtn.svg";
    }
  });

  currentSong.addEventListener("timeupdate", () => {
   
    document.querySelector(".songDuration").innerHTML = `${secondsFormatter(
      currentSong.currentTime
    )} / ${secondsFormatter(currentSong.duration)}`;

    document.querySelector(".dot").style.left = `${
      (currentSong.currentTime * 100) / currentSong.duration
    }%`;
  });

  document.querySelector(".track").addEventListener("click", (e) => {
    //getBoundingClientRect() return a DOMRect object specify position and height,width of element clicked, relative to viewport

    document.querySelector(".dot").style.left =
      (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%";
    currentSong.currentTime =
      (e.offsetX / e.target.getBoundingClientRect().width) *
      currentSong.duration;
  });

  prev.addEventListener("click", () => {
    let i = allSongs.indexOf(currentSong.src);

    if (i > 0) {
      currentSong.src = allSongs[i - 1];
      playMusic(currentSong.src);
    } else {
      playMusic(allSongs[0]);
    }
  });

  next.addEventListener("click", () => {
    let i = allSongs.indexOf(currentSong.src);

    if (i < allSongs.length - 1) {
      currentSong.src = allSongs[i + 1];
      playMusic(currentSong.src);
    } else {
      playMusic(allSongs[allSongs.length - 1]);
    }
  });

  let prevvol;
  let voltrackclick = false
  document.querySelector(".volSeekbar").addEventListener("click", (e) => {
    let percentVol = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".voldot").style.left = percentVol + "%";

    currentSong.volume = percentVol / 100;
    prevvol = percentVol
    voltrackclick = true
  });

let clicked = true
  document.querySelector(".volume").querySelector("img").addEventListener("click", (e) => {
    // clicked = true
    if(clicked ==true){
    document.querySelector(".volume").getElementsByTagName("img")[0].src = "./resources/mute.svg"
    clicked = false
    
    document.querySelector(".voldot").style.left = 0+"%"
    currentSong.volume = 0
    }
    else{
      document.querySelector(".volume").getElementsByTagName("img")[0].src = "./resources/volume.svg"

      if(voltrackclick == true){
      document.querySelector(".voldot").style.left = prevvol + "%";
      currentSong.volume = prevvol/100
      }
      else{
        document.querySelector(".voldot").style.left = 100 + "%";
        currentSong.volume = 1
      }
      clicked = true
    }
  })

 

  
}

main();


let hamb = document.querySelector(".hamburger");
let clicked = false;

hamb.addEventListener("click", () => {
  if (!clicked) {
    document.querySelector(".left").style.left = "1%";
    clicked = true;
    document.querySelector(".hamburger").src = "./resources/cross.svg";
  } else {
    document.querySelector(".left").style.left = "-100%";
    clicked = false;
    document.querySelector(".hamburger").src = "./resources/hamburger.svg";
  }
});
