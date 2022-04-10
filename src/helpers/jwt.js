require('dotenv').config();
const jwt = require('jsonwebtoken');


const JWTGenerator = (uid,name) =>{
     
    return new Promise ((resolve,reject) =>{

        const payload = {
            uid,
            name
        }

        jwt.sign(payload,process.env.SECRET_KEY, {
            expiresIn: '2h'
        },
        (err,token) =>{
            if(err){
                console.log(err);
                return reject('Error in token');
            }
            return resolve(token)
        })
    })
}

module.exports = JWTGenerator;