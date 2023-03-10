// import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import UserController from '../database/controllers/User';

import TeamController from '../database/controllers/Team';

import { Response } from 'superagent';
import { any } from 'sequelize/types/lib/operators';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;
const jwtRegex = /^(?:[\w-]*\.){2}[\w-]*$/;
// regex source https://stackoverflow.com/questions/61802832/regex-to-match-jwt

describe('Testa /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...
 // 
  //   expect(...)
  // });
  describe('teste com informações corretas', () => {
    it('Testa o login com as informações corretas', async () => {
      const response = await chai.request(app).post('/login').send({email: 'user@user.com',
           password: 'secret_user'})
      expect(response.status).to.be.equal(200)
      expect(response.body.token).to.match(jwtRegex)
      });
      it('Testa o /login/validate', async () => {
        const token = await chai.request(app).post('/login').send({email: 'user@user.com',
           password: 'secret_user'})
        const response = await chai.request(app).get('/login/validate').set({ "authorization": token.body.token })
        expect(response.status).to.be.equal(200)
        expect(response.body.role).to.be.equal('user')
        });
  })
  describe('Testa faltando informações', () => {
    it('Testa o login faltando email', async () => {
      const response = await chai.request(app).post('/login').send({email: 'user@user.com'})
      expect(response.status).to.be.equal(400)
      expect(response.body.message).to.be.equal('All fields must be filled')
    })
    it('Testa o login faltando senha', async () => {
      const response = await chai.request(app).post('/login').send({password: 'secret_user'})
      expect(response.status).to.be.equal(400)
      expect(response.body.message).to.be.equal('All fields must be filled')
    })
  })
  describe('Testa com informações incorretas', () => {
    it('Testa com email inexistente', async () => {
      const response = await chai.request(app).post('/login').send({email: 'incorrect@email.com',
         password: 'secret_user'})
    expect(response.status).to.be.equal(401)
    expect(response.body.message).to.be.equal('Incorrect email or password')
    })
    it('Testa com email em formato incorreto', async () => {
      const response = await chai.request(app).post('/login').send({email: 'not_email',
         password: 'secret_user'})
    expect(response.status).to.be.equal(400)
    expect(response.body.message).to.be.equal('All fields must be filled')
    })
    it('Testa com senha incorreta', async () => {
      const response = await chai.request(app).post('/login').send({email: 'user@user.com',
         password: 'incorrect_password'})
    expect(response.status).to.be.equal(401)
    expect(response.body.message).to.be.equal('Incorrect email or password')
    })
    it('Testa o login/validate com login errado', async() => {
        await chai.request(app).post('/login').send({email: 'not_email',
         password: 'incorrect_password'})
         const response = await chai.request(app).get('/login/validate')
         expect(response.status).to.be.equal(401)
         expect(response.body.message).to.be.equal('Token not found')
    })
    it('Testa o login/validate com token errado', async() => {
       const response = await chai.request(app).get('/login/validate').set({ "authorization": 'not_token' })
       expect(response.status).to.be.equal(401)
       expect(response.body.message).to.be.equal('Expired or invalid token')
  })
  })
});