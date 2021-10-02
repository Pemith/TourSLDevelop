const {Admin}=require('../../../Models/admin');
const authz=require('../../../middleware/AuthorizationAdmin');
const mongoose=require('mongoose');

describe('authorize middleware', () =>{
    it('should populate req.admin with the payload of a valid JWT', () =>{
        const admin={
            _id:mongoose.Types.ObjectId().toHexString()
        };
        const token=new Admin(admin).generateAuthToken();
        const req={
            header:jest.fn().mockReturnValue(token)
        };

        const res={};
        const next=jest.fn();

        authz(req,res,next);

        expect(req.admin).toMatchObject(admin);
    });
});