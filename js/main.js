const SESION_CLOSE = document.getElementById('close-session');
const LOG = document.getElementById('log');



function verifySession(){
    let verifyStorage = JSON.parse(localStorage.getItem("log"));
    if (localStorage.getItem("log") !== null){
        if (verifyStorage.log){
            SESION_CLOSE.classList.remove('ocultar');
            SESION_CLOSE.classList.add('close-session');
            LOG.classList.add('ocultar');
        }
    }
}

SESION_CLOSE.addEventListener("click", () => {
    if (localStorage.getItem("log")){
        SESION_CLOSE.classList.add('ocultar');
        SESION_CLOSE.classList.remove('close-session');
        LOG.classList.remove('ocultar');
        localStorage.removeItem("log");
    }

});
document.addEventListener('DOMContentLoaded', verifySession());