import express, { Application as ApplicationType } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/database";
import AppRoutes from "./routes/routes";
import swaggerRoute from "./docs/swagger";

const corsOptions = {
  origin: "*", // Trocar pela url do front end depois...
  optionsSuccessStatus: 200,
};

class Application {
  private app: ApplicationType;

  constructor() {
    this.app = express();
    this.middlewares();
    this.router();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  private router() {
    new AppRoutes(this.app);
    swaggerRoute(this.app);
  }

  public initApp() {
    const PORT: Number = Number(process.env.PORT || 3000);
    const appRuning = this.app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
    appRuning.on("error", (e) => {
      console.error("Erro no servidor:", e);
    });
    connectDB();
  }

  public getApptest() : ApplicationType {
    return this.app;
  }
}

export default new Application();
