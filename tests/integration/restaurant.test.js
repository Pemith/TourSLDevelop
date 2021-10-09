const request=require('supertest');
const {Restaurant}=require('../../Models/Restaurant');
const mongoose = require('mongoose');

let server;

describe('/api/restaurant', () =>{

    beforeEach(() =>{
        server=require('../../index');
    });

    afterEach( async () =>{
        await server.close();
        await Restaurant.remove({});
    });

    describe('GET /', ()=>{
        it('should return all the restaurants', async () =>{

            const restaurants=[
                {
                    // cuisine: ['cuisine1', 'cuisine2'],
                    cuisine:'cuisine1',
                    menu:'menu1',
                    // diningType:['type1','type2']
                    diningType:'type1'
                },
                {
                    // cuisine: ['cuisine3', 'cuisine4'],
                    cuisine:'cuisine2',
                    menu:'menu2',
                    // diningType:['type3','type4']
                    diningType:'type2'
                }
            ];
            
            await Restaurant.collection.insertMany(restaurants);

            const res=await request(server).get('/api/restaurant');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(r=>r.cuisine === 'cuisine1')).toBeTruthy();
            expect(res.body.some(r=>r.cuisine === 'cuisine2')).toBeTruthy();
        })
    });

    describe('GET /:id', () =>{

        it('should return a restaurant if a valid ID is passed', async()=>{

            const restaurant=new Restaurant(
                {
                    // cuisine: ['cuisine1', 'cuisine2'],
                    cuisine:'cuisine1',
                    menu:'menu1',
                    // diningType:['type1','type2']
                    diningType:'type1'
                }
        );

            await restaurant.save();

            const res=await request(server).get('/api/restaurant/' +restaurant._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('cuisine',restaurant.cuisine);
        });
        
        
    });


});