// const server = require('../app');
const supertest = require('supertest');
// const request = supertest(server.server());
const request = supertest('http://localhost:3003');

const PersonModel = require('../model/Person');



describe("Testing with Jest", () => {

    it('Should save person to database', async () => {
        const res = await request.post('/person')
            .send({
                firstname: 'Zellaaa',
                lastname: 'My Zell',
            });

        expect(res.body.firstname).toBeTruthy();
        expect(res.body.lastname).toBeTruthy();

        // Searches the user in the database
        // const person = await PersonModel.find().exec();
        // expect(person.firstname).toBeTruthy();
        // expect(person.lastname).toBeTruthy();

    });


    it('Should get person from the database', async () => {
        const res = await request.get('/people')

        expect(res.body).toBeTruthy;
        expect(res.body[0]).toHaveProperty('firstname', 'Zellaaa');

    });



});