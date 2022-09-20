import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import User from '../database/models/users';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;


const userMock = {
  email: 'admin@admin.com', id: 1, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', role: 'admin', username: 'Admin',
}
const userSendMock = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

describe('Testa a rota login' , () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        ...userMock
      } as User);
  });

  after(()=>{
  (User.findOne as sinon.SinonStub).restore();
  })

  it('return status 200', async () => {

    chaiHttpResponse = await chai
       .request(app).post('/login').send(userSendMock)
    
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
