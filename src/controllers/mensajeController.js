


module.exports = {

    hello( res ) {
        return res.status(201).json({
            message: "¡Hola¡ Esta es la página de inicio."
        });
    },

    about( res ) {
        return res.status(201).json({
            message: "Bienvenido a la página 'Acerca de nosotros'."
        });
    },

    contact( res ) {
        return res.status(201).json({
            message: "Ponte en contacto con nosotros en contact@example.com"
        });
    }
}