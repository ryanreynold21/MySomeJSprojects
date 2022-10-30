
    showLoader()

    let sounds = [
        {
            sound : "C4",
            keyCode : 65
        },
        {
            sound : "D4",
            keyCode :  83
        },
        {
            sound : "E4",
            keyCode : 68
        },
        {
            sound : "F4",
            keyCode : 70
        },
        {
            sound : "G4",
            keyCode : 74
        },
        {
            sound : "A4",
            keyCode : 75
        },
        {
            sound : "B4",
            keyCode : 76
        },
        {
            sound : "C5",
            keyCode : 186
        },
    ];



    const keyboard = document.getElementById("keyboard")

   sounds.forEach(({sound,keyCode}) => {
    const keybtn = document.createElement("div")
    keybtn.classList.add("col");
    keybtn.innerHTML = `<div key="${sound}" keycode="" class="key bg-primary text-center fs-4 text-white rounded d-flex align-items-end justify-content-center">
    <p class="pe-none">${sound}</p>
    <audio src="./sound/${sound}.mp3" class="d-none" controls></audio>
    </div>`
    keyboard.append(keybtn)
})

const getSoundUrl = (keyname) => "./sound/" + keyname + ".mp3";

document.querySelectorAll(".key").forEach(key => {
    key.addEventListener("click", () => {
        const currentPressKey = key.getAttribute("key");
        const currentAudio = document.querySelector(`[src*='${currentPressKey}']`)
        console.log(currentPressKey)
        currentAudio.play()
        // playSound(currentAudio)
    });
});

document.addEventListener("keyup", (e) => {
    const condition = sounds.find(({sound,keyCode}) => keyCode === e.keyCode);
  if(condition){
    //show active
    const currentKey =   document.querySelector(`[key=${condition.sound}]`)
    currentKey.classList.add("active")
    setTimeout(()=>currentKey.classList.remove("active"),200)

    //sound play
   const currentSong =  document.querySelector(`[src*='${condition.sound}']`);
   const newAudio = new Audio()
   newAudio.src = `./sound/${condition.sound}.mp3`
   newAudio.play()

  }

})

// const playSound = (song) =>{
//     // console.log(event);
//     let audio = new Audio(`sound/${song}.mp3`);
//     audio.play();
//     console.log(`Play ${song}`);
// }



export const removeLoader = () => {
    const loader = document.querySelector(".loader");
    loader.remove()
}


export function showLoader(){
    const loaderdiv = document.createElement("div")
    loaderdiv.classList.add("loader")
    loaderdiv.innerHTML =`
    <div class="vh-100 d-flex justify-content-center align-items-center fixed-top">
    <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    `
    document.body.append(loaderdiv)
}

window.addEventListener("load", () => {
    console.log("loading finish")
    removeLoader()
} )