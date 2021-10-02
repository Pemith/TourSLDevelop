const {Admin}=require('../../Models/admin');
const {Site}=require('../../Models/Site');
const request=require('supertest');

describe('authorization middleware', () =>{

    beforeEach( () => {
        // jest.setTimeout(10000);
        server=require('../../index'); 
    })
    afterEach(async () => {
        await server.close(); 
        await Site.remove({});      
    });

    let token;

    const exec =() => {
        return request(server)
            .post('/api/site')
            .set('x-auth-token', token)
            .send({
                name:'site1', 
                district:'district1', 
                address: 'address1',
                siteType:'sitetype1',
                openHrs:'12345'
            });
            
    }

    beforeEach(() =>{
        token=new Admin().generateAuthToken();
    });

    it('should return 401 if no token is provided', async() => {

        token='';
        const res=await exec();

        expect(res.status).toBe(401);

    });

    it('should return 400 if no token is invalid', async() => {

        token='a';
        const res=await exec();

        expect(res.status).toBe(400);

    });

    // it('should return 200 if token is valid', async() => {
       
    //     const res=await exec();

    //     expect(res.status).toBe(200);

    // });


});