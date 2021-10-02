const request=require('supertest');
const {Site}=require('../../Models/Site');
const {Admin}=require('../../Models/admin');
const mongoose = require('mongoose');


let server;

describe('/api/site', ()=>{

    beforeEach( () => {
        server=require('../../index'); 
    })
    afterEach( async () => {
        await server.close();
        await Site.remove({});
    });

    
    
    describe('GET /', ()=>{
        it('should return all the sites', async () =>{

            await Site.collection.insertMany([
                {
                    name:'site1', 
                    district:'district1', 
                    address: 'address1',
                    siteType:'sitetype1',
                    openHrs:'12345'
                },
                {
                    name:'site2', 
                    district:'district2', 
                    address: 'address2',
                    siteType:'sitetype2',
                    openHrs:'12345'
                }
                
            ]);

            const res=await request(server).get('/api/site');

            expect (res.status).toBe(200);
            expect (res.body.length).toBe(2);
            expect(res.body.some(site => site.name === 'site1')).toBeTruthy();
            expect(res.body.some(site => site.name === 'site2')).toBeTruthy();

            
        }); 
    });

    describe('GET /:id', () =>{

        it('should return a site if a valid id is passed', async() => {
            const site=new Site(
                {
                    name:'site1', 
                    district:'district1', 
                    address: 'address1',
                    siteType:'sitetype1',
                    openHrs:'12345'
                });
            await site.save();

            const res= await request(server).get('/api/site/' +site._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', site.name);
            
        });

        it('should return 404 if a invalid id is passed', async() => {
           

            const res= await request(server).get('/api/site/1' );

            expect(res.status).toBe(404);
        });

        it('should return 404 if no genre with the given id exist', async() => {
           
            const id = mongoose.Types.ObjectId();
            const res= await request(server).get('/api/site/'+id );

            expect(res.status).toBe(404);
        });
    });

    describe( 'POST /', () =>{

        let token;
        let name;
        let district; 
        let address;
        let siteType;
        let openHrs;

        const exec = async () => {
            return await request(server)
                .post('/api/site')
                .set('x-auth-token', token)
                .send(
                    {   
                        name,
                        district, 
                        address,
                        siteType,
                        openHrs
                    }
                );
          }

          beforeEach(() => {
            token=new Admin().generateAuthToken();
            name='site1';
            district='district1'; 
            address='address1';
            siteType='sitetype1';
            openHrs='12345';

          });

        
        it('should return 401 if admin is not logged in', async () =>{
            token='';
            const res = await exec();
            expect(res.status).toBe(401);
            
        });

        it('should return 400 if site is less than 3 charactes', async () =>{

            name='12';

            const res=await exec();

            expect(res.status).toBe(400);
            
            
        });

        it('should return 400 if site is morethan than 255 charactes', async () =>{

            name=new Array(257).join('s');

            const res=await exec();

            expect(res.status).toBe(400);
            
            
        });

        it('should save the activity provider if it is valid', async () =>{

            const res=await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name','site1');           
        });

        it('should return the site if it is valid', async () =>{

            const res=await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name','site1');       
            
        });
    });


});