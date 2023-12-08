const connection = require('../config/connection');


const FindById = {};



FindById.find = (id, result) => {
    const sql = `
    SELECT
        iId,
        sNombre,
        sApellido,
        sCorreo,
        sContrasenia
    FROM
        usuarios
    WHERE
        iId = ?
    `;

    connection.query(
        sql,
        [id],
        (err, user) => {
            if ( err ) {
                console.log(`Falla: ${err}`);
                result(err, null);
            } else {
                result(null, user[0]);
            }
        }
    )
}

module.exports = FindById;