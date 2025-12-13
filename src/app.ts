import express, { Application } from "express";
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

class App {
  private server: Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors(corsOptions));
    this.server.use(helmet());
    this.server.use(morgan("dev"));
  }

  private router() {
    new AppRoutes(this.server);
    swaggerRoute(this.server);
  }

  public initApp() {
    const PORT: Number = Number(process.env.PORT || 3000);
    const server = this.server.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
    server.on("error", (e) => {
      console.error("Erro no servidor:", e);
    });
    connectDB();
  }
}

export default new App();
