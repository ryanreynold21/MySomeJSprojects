
const uploader = document.querySelector("#uploader");
const uploaded = document.querySelector(".uploaded");
const uploaderUI = document.querySelector("#uploaderUI")

uploaderUI.addEventListener("click", ()=> uploader.click() )   //!important
uploader.addEventListener("change",() => {
    [...uploader.files].forEach(currentFiles => {
        const reader = new FileReader();
        reader.readAsDataURL(currentFiles)
        reader.addEventListener("load", (event) => {
            const newImg = new Image(200,200);
            newImg.src = event.target.result;
            newImg.classList.add("mb-4","animate__animated","animate__slideInDown")
            uploaded.append(newImg)
        })
    })
})

