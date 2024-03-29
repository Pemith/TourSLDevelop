const jwt=require('jsonwebtoken');
const config=require('config');


function authz(req,res,next){

    // if (!config.get("requiresAuth")) return next();

    const token=req.header('x-auth-token');

    if(!token){
        return res.status(401).send('Access denied. No token provide.');
    }

    try{
        const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
        req.admin=decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid Token');
    }
}


module.exports=authz;