import * as express from 'express';
import UserController from './database/controllers/User';
import TeamController from './database/controllers/Team';
import MatchController from './database/controllers/Match';
import validateToken from './database/middlewares/validateToken';
import validateEmail from './database/middlewares/validateEmail';
import validatePassword from './database/middlewares/validatePassword';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post(
      '/login',
      validateEmail,
      validatePassword,
      (req, res) => UserController.findUser(req, res),
    );

    this.app.get(
      '/login/validate',
      validateToken,
      // validateEmail,
      // validatePassword,
      // (req, res) => UserController.findUserRole(req, res),
    );

    this.app.get('/teams', (req, res) => TeamController.findAllTeams(req, res));

    this.app.get('/teams/:id', (req, res) => TeamController.findTeam(req, res));

    this.app.get('/matches', (req, res) => MatchController.findAllMatches(req, res));
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
