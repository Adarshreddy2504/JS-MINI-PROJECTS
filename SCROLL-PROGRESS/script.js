const progressBar = document.getElementById("myBar");
const badge=document.getElementById("badge");

function updateProgress() {
    const scrollTop =window.scrollY;
    const docHeight =document.documentElement.scrollHeight-window.innerHeight;
    const progress =Math.min(Math.round((scrollTop / docHeight) * 100),100);
    progressBar.style.width =progress + "%";

    if(progress>=100){
        badge.textContent="✅ Complete";
        badge.classList.add("complete");
    }
    else{
        badge.textContent=progress + "% Read";
        badge.classList.remove("complete");
    }
}

window.addEventListener("scroll",updateProgress);
window.addEventListener("load",updateProgress);