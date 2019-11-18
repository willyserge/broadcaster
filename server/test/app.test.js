import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../index.js";

const { expect } = chai;
chai.use(chaiHttp);
const token = process.env.TEST_TOKEN;
describe("Server", () => {

  //testing sign up route
  describe('POST /api/v1/auth/signup', () => {
    it('should create a user', (done) => {
      const user = {
        firstname: 'user',
        lastname: 'user ',
        email: 'user@gmail.com',
        phoneNumber: '0784079275',
        username: 'user250',
        password: 'userPassword',
      };
  
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body).to.be.a('Object');
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0].token);
          done();
          
        });
    });
  });
 
  });


