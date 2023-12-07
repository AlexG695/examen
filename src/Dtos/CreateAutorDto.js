


class CreateAutorDTO {

    nombre = "";

    pais = "";

    lengua = "";

    fechaNacimiento = "";


    constructor(data) {
        this.nombre = data.nombre;
        this.pais = data.pais;
        this.lengua = data.lengua;
        this.fechaNacimiento = data.fechaNacimiento;
    }
}


module.exports = CreateAutorDTO;