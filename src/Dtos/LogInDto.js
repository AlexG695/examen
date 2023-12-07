

class LogInDTO {


    correo = "";

    contrasenia = "";


    constructor(data) {
        this.correo = data.correo;
        this.contrasenia = data.contrasenia;
    }

}


module.exports = LogInDTO;