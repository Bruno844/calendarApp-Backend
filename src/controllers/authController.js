import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { generarJWT } from "../helpers/jwt.js";

export const registerUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        let user = await userModel.findOne({email});
        
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'ya existe un usuario con ese correo'
            })
        }
        
     

        user = new userModel(req.body);

        //*encript contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //*generar jwt
        const token = await generarJWT(user.id, user.name)




        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error a la hora de registrar'
        })

    }

}

export const loginUser = async (req, res) => {

    const { email,password } = req.body;


    try {

        const userExisted = await userModel.findOne({email})
        if(!userExisted) {
            return res.status(400).json({
                ok: false,
                msg: 'no existe un usuario con ese email'
            }) 
        }

        //*confirmar las password
        const validPassword = bcrypt.compareSync(password, userExisted.password)

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña incorrecta'
            })
        }


        //*generar JWT
        const token = await generarJWT(userExisted.id, userExisted.name)

        res.json({
            ok: true,
            uid: userExisted.id,
            email,
            token
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error a la hora de loguear'
        })
    }

}

export const renewToken = async (req, res) => {
    
    const {uid,name} = req;

    const token = await generarJWT(uid, name)
    
    res.json({
        msg: 'renovar token',
        uid,
        name,
        token
    })

}




