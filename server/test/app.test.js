import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../index.js";

const { expect } = chai;
chai.use(chaiHttp);
describe("Server", () => {
  it("welcomes user to broadcaster api", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("Welcome To Broadcaster");
        done();
      });
  });

});