const bcryptjs = require('bcryptjs');
const User = require('../database/models/user');
const JWTGenerator = require('../helpers/jwt');

module.exports ={
    userCreate : async (req,res) => {
        const {email,password } = req.body

        try {
            let user = await User.findOne({
                email
            })
            if(user){
                return res.status(400).json({
                    ok: false,
                    message :'Email already exists'
                })
            }
            user = new User(req.body)
            user.password = bcryptjs.hashSync(password,10)
            /* console.log(user) */

            await user.save();

            const token = await JWTGenerator(user._id,user.name)

            return res.status(201).json({
                ok: true,
                uid: user.id,
                name : user.name,
                token
            })

          
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                ok:false,
                message:'contact the administrator',
                error
            })
        }
    },
    login : async (req,res) =>{
       const {email,password} = req.body
       try {
            const user = await User.findOne({email})
            const validPassword = user && bcryptjs.compareSync(password, user.password)

            if(!user || !validPassword){
                return res.status(400).json({
                    ok:false,
                    message:'Invalid credentials'
                })
            }
         // genero el JWT
         const token = await JWTGenerator(user.id,user.name)
         console.log(token)

        return res.status(200).json({
             ok:true,
             uid: user.id,
             name:user.name,
             token
         })

       } catch (error) {
          return res.status(500).json({
               ok:false,
               message:'contact the administrator',
               error
              })
       }
    },
    revalidateToken: async(req,res) =>{

        try {
            const token = await JWTGenerator(req.id , req.name);
            
            return res.status(200).json({
                ok:true,
                token
            })
            
        } catch (error) {
            return res.status(500).json({
                ok:false,
                message:'contact the administrator',
                error
               })
        }
    }
}