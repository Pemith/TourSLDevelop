const mongoose=require('mongoose');


const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,      
    },

    password : {
        type:String,
        required:true
    },

    tags: [String],
    date:{type:Date,default:Date.now},
    isPublished:Boolean
});

const Admin=mongoose.model('Admin',adminSchema);

async function createAdmin(){
    const admin=new Admin({
        name: 'Pemith',
        email: 'pemithr@gmail.com',
        password: 'pemtith12345',
        tags: ['admin1'],
        isPublished:true
        
    });

    try{
        const result=await admin.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
}

createAdmin();