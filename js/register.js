const FORM = document.getElementById("form");
const BTN_SUBMIT = document.getElementById("btn_submit");
const BTN_RANDOM_CAPTCHA = document.getElementById("actualizar_captcha");
const BTN_VALIDATION_CAPTCHA = document.getElementById("btn-validation-captcha");
const USER_FORM = document.getElementById("user_form");
const PASSWORD_FORM = document.getElementById("password_form");
const RE_PASSWORD_FORM = document.getElementById("re_password_form");
const EMAIL_FORM = document.getElementById("email_form");
const IS_CHECKED = document.getElementById('checkbox-terminos-condiciones');
const CAPTCHA_RANDOM = document.getElementById("captcha-random");
const VALIDATION_CAPTCHA = document.getElementById("validation-captcha");
let icon_btn_random = document.getElementById("icon-captcha-random");
let icon_btn_validation = document.getElementById("icon-captcha-validation");
let result_captcha = document.getElementById("result-captcha");


/*Evento del botón de confirmar el form*/
BTN_SUBMIT.addEventListener("click", (e) => {
    e.preventDefault();/*Cancela la acción default del botón*/
    /*Verifíca si el form no está vacío*/
    if(USER_FORM.value == "" || PASSWORD_FORM.value == "" || RE_PASSWORD_FORM.value == "" || EMAIL_FORM.value == ""){
        /*Si está vacío el form nuestra un alert*/
        alert("Debe completar los campos obligatorios ( * ) para poder enviar el formulario.");
    }else{
        if (PASSWORD_FORM.value === RE_PASSWORD_FORM.value){
            /*Creamos un objeto que vamos a cargar en el localstorage*/
            registerUser();
            alert("Gracias por registrarse. " + `Usuario: ${USER_FORM.value} Password: ${PASSWORD_FORM.value}`);
            FORM.submit();
        }else{
            alert("Las Passwords no coinciden, por favor vuelva a ingresar ambas passwords");
            PASSWORD_FORM.value = "";
            RE_PASSWORD_FORM.value = "";
        }
    }
});

function registerUser(){
    let obj_register = {
        "user": USER_FORM.value,
        "password": PASSWORD_FORM.value,
        "email": EMAIL_FORM.value
    };
    let arrayUsers = JSON.parse(localStorage.getItem("users"));
    arrayUsers.push(obj_register);
    localStorage.setItem("users", JSON.stringify(arrayUsers));
}

/*Evento que se aplíca al checkbox del formulario*/
IS_CHECKED.addEventListener("change", checkedAceptTerm);

/*Función que se ejecuta en el evento del checkbox*/
function checkedAceptTerm(){
        /*Si el checkbox está seleccionado activa el botón de confirmar*/
        if(IS_CHECKED.checked) {
            btnOn(BTN_SUBMIT);
        }else{
            /*Si el checkbox no está seleccionado desactiva el botón de confirmar*/
            btnOff(BTN_SUBMIT);
        }
}

/*Prende el boton Confirmar*/
function btnOn(btn){
    /*Activa el botón de Confirmar el formulario y cambia las clases para los colores*/
    btn.disabled = false;
    btn.classList.toggle('btn-off');
    btn.classList.toggle('btn-on');
    /*Retorna el botón modificado*/
    return btn;
}
/*Apaga el boton Confirmar*/
function btnOff(btn){
    /*Desactiva el botón de Confirmar el formulario y cambia las clases para los colores*/
    btn.disabled = true;
    btn.classList.toggle('btn-off');
    btn.classList.toggle('btn-on');
    /*Retorna el botón modificado*/
    return btn;
}
/*Activa los botones y los inputs del captcha en el formulario*/
function btnCaptchaOn(btn){
    /*Activa el botón y cambia las clases para los colores*/
    btn.disabled = false;
    btn.classList.toggle('btn-captcha-off');
    btn.classList.toggle('icon-btn');
    /*Retorna el botón modificado*/
    return btn;
}
/*Desactiva los botones y los inputs del captcha en el formulario*/
function btnCaptchaOff(btn){
    /*Desactiva el botón y cambia las clases para los colores*/
    btn.disabled = true;
    btn.classList.toggle('btn-captcha-off');
    btn.classList.remove('icon-btn');
    /*Retorna el botón modificado*/
    return btn;
}

BTN_RANDOM_CAPTCHA.addEventListener("click", (e) => {
    /*Desactiva la función default del botón*/
    e.preventDefault();
    /*Cambia el número del captcha por uno nuevo*/
    changeCaptcha();
});
/*Evento del botón para validar el captcha del formulario*/
BTN_VALIDATION_CAPTCHA.addEventListener("click", (e) => {
    /*Desactiva la función default del botón*/
    e.preventDefault();
    /*Verifíca si el captcha ingresado es correcto o incorrecto*/
    validationCaptcha();
});
/*Función que se ejecuta en el evento del botón de validación*/
function validationCaptcha() {
    /*Se trae el elemento html con el id especificado*/
    
    /*Se verifíca que el valor del captcha coincída con el valor random*/
    if (VALIDATION_CAPTCHA.value === CAPTCHA_RANDOM.value) {
        /*Si coincíden los valores del captcha reinicia los botones y el captcha a sus valores de inicio*/
        btnOn(IS_CHECKED);
        btnCaptchaOff(BTN_RANDOM_CAPTCHA);
        btnCaptchaOff(BTN_VALIDATION_CAPTCHA);
        btnCaptchaOff(VALIDATION_CAPTCHA);
        btnCaptchaOff(icon_btn_random);
        btnCaptchaOff(icon_btn_validation);
        /*Cambia las clase de los colores del mensaje de correcto o incorrecto*/
        result_captcha.classList.add("validation-correct");
        result_captcha.classList.remove("validation-incorrect");
        result_captcha.innerHTML = "Correct";
    }else{
        /*Si los valores del captcha no coincíden muestra un mensaje de error y le aplíca una clase*/
        result_captcha.classList.add("validation-incorrect");
        result_captcha.innerHTML = "Incorrect Captcha";
        changeCaptcha();
    }
}
/*Función para obtener un numero aleatorio*/
function randomNumber(){
    /*Genera número random*/
    let random_captcha = Math.floor((Math.random() * 100000));
    /*Retorna el número random*/
    return random_captcha;
}
/*Función que cambia el número del captcha*/
function changeCaptcha(){
    /*Carga el número random en el valor del captcha*/
    CAPTCHA_RANDOM.value = randomNumber();
}

document.addEventListener("DOMContentLoaded", changeCaptcha());