// import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;
import teams from './mocks/teams'

describe('Testa /teams', () => {
    it('Testa o findAll', async () => {
      const response = await chai.request(app).get('/teams')
  
      expect(response.status).to.be.equal(200)
      expect(response.body).to.deep.equal(teams)
    })
    it('Testa o findByPk', async () => {
      const response = await chai.request(app).get('/teams/1')
  
      expect(response.status).to.be.equal(200)
      expect(response.body).to.deep.equal({
        "id": 1,
        "teamName": "Avaí/Kindermann"
      })
    })
  })