const request=require('supertest');
const {ActivityProvider}=require('../../Models/ActivityProvider');

let server;

describe('/api/activityprovider', ()=>{

    beforeEach( () => {
        server=require('../../index'); 
    })
    afterEach( async () => {
        await server.close();
        await ActivityProvider.remove({});
    });

    
    
    describe('GET /', ()=>{
        it('should return all the activityproviders', async () =>{

            await ActivityProvider.collection.insertMany([
                {activityType:'activity 1', package:'pkg2', price: 2000},
                {activityType:'activity 2' , package:'pkg2', price: 2000},
            ]);

            const res=await request(server).get('/api/activityprovider');

            expect (res.status).toBe(200);
            expect (res.body.length).toBe(2);
            expect(res.body.some(ap => ap.activityType === 'activity 1')).toBeTruthy();
            expect(res.body.some(ap => ap.activityType === 'activity 2')).toBeTruthy();

            
        }); 
    });

    describe('GET /:id', () =>{

        it('should return a activityprovider if a valid id is passed', async() => {
            const activityProvider=new ActivityProvider({activityType:'activity 1', package:'pkg2', price: 2000});
            await activityProvider.save();

            const res= await request(server).get('/api/activityprovider/' +activityProvider._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('activityType', activityProvider.activityType);
            // expect(res.body).toHaveProperty('package', activityProvider.package);
            // expect(res.body).toHaveProperty('price', activityProvider.price);

        });

        it('should return 404 if a invalid id is passed', async() => {
           

            const res= await request(server).get('/api/activityprovider/1' );

            expect(res.status).toBe(404);
        });
    });

    describe( 'POST /', () =>{


        
        it('should return 400 if activityprovider has invalid input', async () =>{

            const res=await request(server)
                .post('/api/activityprovider')
                .send({activityType:'abc', package: '', price: null});

            expect(res.status).toBe(400);
            
            
        });

        it('should return 400 if activityprovider is invalid input with maximum characters', async () =>{

            const name=new Array(102).join('a');

            const res=await request(server)
                .post('/api/activityprovider')
                .send({activityType:name, package: '', price: null});

            expect(res.status).toBe(400);
            
            
        });

        it('should save the activity provider if it is valid', async () =>{

            const res=await request(server)
                .post('/api/activityprovider')
                .send({activityType:'activity 1', package: 'package 1', price: 1000});

            const activityProvider=await ActivityProvider.find({activityType:'activity 1', package: 'package 1', price: 1000});

            expect(activityProvider).not.toBeNull();
            
            
        });

        it('should return the activity provider if it is valid', async () =>{

            const res=await request(server)
                .post('/api/activityprovider')
                .send({activityType:'activity 1', package: 'package 1', price: 1000});

            const activityProvider=await ActivityProvider.find({activityType:'activity 1', package: 'package 1', price: 1000});

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('activityType','activity 1');
            expect(res.body).toHaveProperty('package','package 1');
            expect(res.body).toHaveProperty('price',1000);
            
        });
    });


});