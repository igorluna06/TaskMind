import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import eventRoutes from "./routes/event/eventRoutes";
import { RoutePaths } from "./routes/constants/RoutePaths";

const app = express();

app.use(express.json());
app.use(RoutePaths.EVENTS, eventRoutes);

app.use(errorHandler);

export default app;