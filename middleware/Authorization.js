const jwt=require('jsonwebtoken');
const config=require('config');

function auth(req,res,next){
    
    
    const token=req.header('x-auth-token');

    //status 401=Unauthorized
    if(!token){
        return res.status(401).send('Access denied.');
    }
    try{
        const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
        req.customer=decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid Token');
    }
}

module.exports=auth;