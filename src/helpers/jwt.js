import jwt from 'jsonwebtoken';

export const generarJWT = (uid, name) => {

    return new Promise((resolve,reject) => {
        const payload = {uid,name}

        jwt.sign(payload,process.env.SECRET_JWT,{
            expiresIn: '2h'
        }, (err,token) => {
            if(err){
                console.log('no se pudo generar token')
                reject(err)
            }

            resolve(token)
        })
    })




}