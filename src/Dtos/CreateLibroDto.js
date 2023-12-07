

class CreateLibroDTO {

    idAutor = "";

    nombre = "";

    numeroPaginas = "";

    categoria = "";

    calificacion = "";

    fechaPublicacion = "";


    constructor(data) {
        this.idAutor = data.idAutor;
        this.nombre = data.nombre;
        this.numeroPaginas = data.numeroPaginas;
        this.categoria = data.categoria;
        this.calificacion = data.calificacion;
        this.fechaPublicacion = data.fechaPublicacion;
    }

}

module.exports = CreateLibroDTO;