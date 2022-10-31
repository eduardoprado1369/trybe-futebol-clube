// import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;
import leaderboard from './mocks/leaderboard'
import homeLeaderboard from './mocks/leaderboard.home'
import awayLeaderboard from './mocks/leaderboard.away'

describe('Testa /leaderboard', () => {
    it('Testa o /leaderboard', async () => {
      const response = await chai.request(app).get('/leaderboard')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.deep.equal(leaderboard)
    })
    it('Testa o /leaderboard/home', async () => {
      const response = await chai.request(app).get('/leaderboard/home')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.deep.equal(homeLeaderboard)
    })
    it('Testa o /leaderboard/away', async () => {
      const response = await chai.request(app).get('/leaderboard/away')

      expect(response.status).to.be.equal(200)
      expect(response.body).to.deep.equal(awayLeaderboard)
    })
  })