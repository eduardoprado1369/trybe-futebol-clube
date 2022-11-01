// import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;
import allMatches from './mocks/matches'
import inProgressMatches from './mocks/inProgressMatches'
import finishedMatches from './mocks/finishedMatches'

describe('Testa /matches', () => {
    it('Testa o findAll', async () => {
      const response = await chai.request(app).get('/matches')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.deep.equal(allMatches)
    })
    it('Testa o findInProgressMatches', async () => {
        const response = await chai.request(app).get('/matches?inProgress=true')
  
        expect(response.status).to.be.equal(200)
        expect(response.body).to.deep.equal(inProgressMatches)
      })
      it('Testa o findFinishedMatches', async () => {
        const response = await chai.request(app).get('/matches?inProgress=false')
  
        expect(response.status).to.be.equal(200)
        expect(response.body).to.deep.equal(finishedMatches)
      })
      it('Testa o createMatches sem token', async () => {
        const response = await chai.request(app).post('/matches').send({
          "homeTeam": 16,
          "homeTeamGoals": 0,
          "awayTeam": 8,
          "awayTeamGoals": 0,
        })

        expect(response.status).to.be.equal(401)
        expect(response.body.message).to.be.equal('Token must be a valid token')
      })
      it('Testa o createMatches com time repetido', async () => {
        const token = await chai.request(app).post('/login').send({email: 'user@user.com',
       password: 'secret_user'}) 
        const response = await chai.request(app).post('/matches').send({
          "homeTeam": 8,
          "homeTeamGoals": 0,
          "awayTeam": 8,
          "awayTeamGoals": 0,
        }).set({ "authorization": token.body.token })
        expect(response.status).to.be.equal(422)
        expect(response.body.message).to.be.deep.equal('It is not possible to create a match with two equal teams')
      })
      it('Testa o createMatches com time com ID inexistente', async () => {
        const token = await chai.request(app).post('/login').send({email: 'user@user.com',
       password: 'secret_user'}) 
        const response = await chai.request(app).post('/matches').send({
          "homeTeam": 8,
          "homeTeamGoals": 0,
          "awayTeam": 8,
          "awayTeamGoals": 0,
        }).set({ "authorization": token.body.token })
        expect(response.status).to.be.equal(422)
        expect(response.body.message).to.be.deep.equal('It is not possible to create a match with two equal teams')
      })
      it('Testa o createMatches com time com ID inexistente', async () => {
        const token = await chai.request(app).post('/login').send({email: 'user@user.com',
       password: 'secret_user'}) 
        const response = await chai.request(app).post('/matches').send({
          "homeTeam": 999,
          "homeTeamGoals": 0,
          "awayTeam": 998,
          "awayTeamGoals": 0,
        }).set({ "authorization": token.body.token })
        expect(response.status).to.be.equal(404)
        expect(response.body.message).to.be.deep.equal('There is no team with such id!')
      })

  })