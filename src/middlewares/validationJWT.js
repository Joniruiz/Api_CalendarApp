const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    //x-token -->> headers

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok : false,
            message : 'Token not provided'
        })
    }

    try {
        
        const payload = await jwt.verify(token,process.env.SECRET_KEY);

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {

        return res.status(401).json({
            ok: false,
            message : 'Token invalid'
        }) 
    }
    next();
}