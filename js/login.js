const USERNAME = document.getElementById('username');
const PASSWORD = document.getElementById('password');
const BTN_LOGIN = document.getElementById('button');
const SESION = document.getElementById('close-session');
const FORM_LOGIN = document.getElementById('form-login');
const WELCOME_LOGIN = document.getElementById('logInOn');

/*Arreglo pre cargado con usuarios*/
const userArray = [
    {
        "user": "juan",
        "password": "123",
        "email": "juan@gmail.com"
    },
    {
        "user": "esteban",
        "password": "123",
        "email": "esteban@gmail.com"
    }];

/*Se carga el localStorage con el array de usuarios registrados*/
function cargarStorage(){
    let verify = JSON.parse(localStorage.getItem("users"));
    let log = JSON.parse(localStorage.getItem("log"));
    if (verify === null || verify === undefined){
        localStorage.setItem("users", JSON.stringify(userArray));
    }else{
        if (log !== null){
            if (log.log === true){
                USERNAME.classList.toggle('ocultar');
                PASSWORD.classList.toggle('ocultar');
                console.log("TENDRÍA QUE OCULTAR EL FORM"); 
                FORM_LOGIN.classList.toggle('ocultar');
                WELCOME_LOGIN.classList.toggle('ocultar');
                WELCOME_LOGIN.innerText += `Bienvenido, Estás logueado como: ${log.user}`;
            }
        }
    }
}
    
/*Verifica los usuarios cargados en el localstorage para saber si existe el usuario*/
function verifyUser(user,pass){
    let userArray2 = JSON.parse(localStorage.getItem("users"));
    let verify = false;
    userArray2.forEach(element => {
        if(user == element.user && pass == element.password){
            verify = true;
        }
    });
    return verify;
}

/*Evento del botón para conectarse*/
BTN_LOGIN.addEventListener('click', (e) => {
    e.preventDefault();
    if ((USERNAME.value == "") || (PASSWORD.value == "")){
        alert("Debe ingresar los datos para poder conectarse.");
    }else{
        if (!verifyUser(USERNAME.value,PASSWORD.value)){
            alert("Usuario o contraseña incorrectos.");
        }else{
            let user_log = {
                "user": USERNAME.value,
                "password": PASSWORD.value,
                "log": true
            }

            localStorage.setItem("log",JSON.stringify(user_log));
            SESION.classList.remove('ocultar');
            SESION.classList.add('close-session');
            location.href = "../index.html";
        }
    }
});
/*Espera que la pagina esté cargada y después carga el localstorage con el array de usuarios*/
document.addEventListener('DOMContentLoaded', cargarStorage());