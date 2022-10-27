import * as express from 'express';
import UserController from './database/controllers/User';
import TeamController from './database/controllers/Team';
import MatchController from './database/controllers/Match';
import validateToken from './database/middlewares/validateToken';
import vEmail from './database/middlewares/vEmail';
import vPassword from './database/middlewares/vPassword';
import vToken from './database/middlewares/vToken';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post('/login', vEmail, vPassword, (req, res) => UserController.findUser(req, res));
    this.app.get('/login/validate', validateToken);
    this.app.get('/teams', (req, res) => TeamController.findAllTeams(req, res));
    this.app.get('/teams/:id', (req, res) => TeamController.findTeam(req, res));
    this.app.get('/matches', (req, res) => MatchController.findAllMatches(req, res));
    this.app.post('/matches', vToken, (req, res) => MatchController.createMatch(req, res));
    this.app.patch('/matches/:id/finish', vToken, (req, res) => MatchController
      .finishMatch(req, res));
    this.app.patch('/matches/:id', (req, res) => MatchController.updateMatch(req, res));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação

export const { app } = new App();
