

class CreateClientDTO {

    nombre = "";

    apellido = "";

    correo = "";

    contrasenia = "";


    constructor(data) {
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.correo = data.correo;
        this.contrasenia = data.contrasenia;
    }
}


module.exports = CreateClientDTO;