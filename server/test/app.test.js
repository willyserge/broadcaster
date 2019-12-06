import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const { expect } = chai;
chai.use(chaiHttp);
const token = process.env.TEST_TOKEN;
describe('Server', () => {

  // testing sign up route
  describe('POST /api/v2/auth/signup', () => {
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
        .post('/api/v2/auth/signup')
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
  // sign in route test
  describe('POST /api/v2/auth/signin', () => {
    it('should login user and return auth token', (done) => {
      const user = {
        email: 'user@gmail.com',
        password: 'userPassword',
      };

      chai.request(app)
        .post('/api/v2/auth/signin')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body.message).to.be.equal('User is successfuly logged in');
          expect(res.body).to.be.a('Object');
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0].token);
          done(err);

        });
    });
  });
  // test get all red flags route
  describe('GET /api/v2/red-flags', () => {
    it('should get all red-flag records', (done) => {
      chai.request(app)
        .get('/api/v2/red-flags')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.a('Object');
          done(err);
        });
    });
  });
  // test get red-flag by id
  describe('GET /api/v2/red-flags/id', () => {
    it('should get a red-flag record by its ID', (done) => {


      chai.request(app)
        .get('/api/v2/red-flags/1')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.a('Object');
          done(err);
        });
    });
  });

  // test create red-flag

  describe('POST /api/v2/red-flags', () => {
    it('should create a red-flag record', (done) => {

      // other specs for the redflag are specified in the pushed object
      const redFlag = {

        title: 'test title',
        type: 'red-flag',
        location: '1.9706, 30.1044',
        comment: 'test comment',

      };

      chai.request(app)
        .post('/api/v2/red-flags')
        .set('x-auth-token', process.env.test_token)
        .send(redFlag)
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          expect(res.body.status).to.be.equal(201);
          expect(res.body).to.be.a('Object');
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0].message).to.be.equal('Created red-flag record');
          done(err);

        });
    });
  });
  // testing the update location route
  describe('PATCH  /api/v2/red-flags/id/location', () => {
    it("should successfully update a red-flag's location", (done) => {
      const newLocation = {
        location: '14131, 6575',
      };

      chai.request(app)
        .patch('/api/v2/red-flags/2/location')
        .set('x-auth-token', process.env.test_token)
        .send(newLocation)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.a('Object');
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0].message).to.be.equal("Updated red-flag record's location");

          done(err);
        });
    });

    it('should not find a red-flag record', (done) => {

      chai.request(app)
        .patch('/api/v2/red-flags/8/location')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body).to.be.a('Object');
          expect(res.body.error).to.be.equal('a red-flag with the given ID was not found.');

          done(err);
        });
    });

    it('should not be able to edit a red-flag location', (done) => {

      chai.request(app)
        .patch('/api/v2/red-flags/1/location')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.status).to.be.equal(405);
          expect(res.body.status).to.be.equal(405);
          expect(res.body).to.be.a('Object');
          expect(res.body.error).to.be.equal('you can no longer edit the location of this red-flag.');

          done(err);
        });
    });
  });
  // testing the update comment endpoint
  describe('PATCH  /api/v2/red-flags/id/comment', () => {
    it('should successfully update a red-flag comment', (done) => {
      const newComment = {
        comment: 'test comment',
      };

      chai.request(app)
        .patch('/api/v2/red-flags/2/comment')
        .set('x-auth-token', process.env.test_token)
        .send(newComment)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.a('Object');
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0].message).to.be.equal("Updated red-flag record's comment");

          done(err);
        });
    });

    it('should not find a red-flag record', (done) => {

      chai.request(app)
        .patch('/api/v2/red-flags/8/comment')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body).to.be.a('Object');
          expect(res.body.error).to.be.equal('a red-flag with the given ID was not found.');

          done(err);
        });
    });
  });
  // testing delete red-flag route
  describe('DELETE  /api/v2/red-flags/id', () => {
    it('should successfully delete a red-flag record', (done) => {

      chai.request(app)
        .delete('/api/v2/red-flags/6')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.a('Object');
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0].message).to.be.equal('red-flag record has been deleted');


          done(err);
        });
    });

    it('should not find a red-flag record ', (done) => {

      chai.request(app)
        .delete('/api/v2/red-flags/8')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.body.status).to.be.equal(404);
          expect(res.body).to.be.a('Object');
          expect(res.body.error).to.be.equal('a red-flag with the given ID was not found.');

          done(err);
        });
    });
  });

  // admin change status route

  describe('PATCH  /api/v2/red-flags/id/status', () => {
    it('should successfully change the status of a red-flag', (done) => {
      const newStatus = {
        status: 'under investigation',
      };

      chai.request(app)
        .patch('/api/v2/admin/red-flags/1/status')
        .set('x-auth-token', process.env.test_token)
        .send(newStatus)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.a('Object');
          expect(res.body.data).to.have.lengthOf(1);
          expect(res.body.data[0].message).to.be.equal("Changed red-flag record's status");

          done(err);
        });
    });

    it('should not find a red-flag record ', (done) => {

      chai.request(app)
        .patch('/api/v2/admin/red-flags/8/status')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.body.status).to.be.equal(404);

          done(err);
        });
    });
  });

  describe('GET api/v2/admin/red-flags', () => {
    it('should list all incidents by all users', (done) => {
      chai.request(app)
        .get('/api/v2/admin/red-flags')
        .set('x-auth-token', process.env.test_token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.be.a('Object');
          done();
        });
    });


  }); 
});


