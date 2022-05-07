import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async(req, res) => {
    //validar
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje:'El nombre esta vacío'})
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo está vacío'})
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje está vacío'})
    }

    console.log(errores)
    if(errores.length > 0){
        //mostrar la vista con errores
        //consultar testimoniales existentes

        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            //pasamos a la vista todos los campos que hemos rellenados para no tener que volver hacerlo
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } 
    //Almacenar en la base de datos
    else{
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
};

export {
    guardarTestimonial
}