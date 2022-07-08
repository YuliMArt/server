const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { keyJWToken } = require('../data');
const Usuario = require('../models/usuario');



const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, keyJWToken );

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findByPk( uid );
        // const agente = await Agente.findByPk(uid);
        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true no ha sido borrado
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        // console.log(error,'erro');
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}