import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import eventRoutes from "./routes/event/eventRoutes";
import { RoutePaths } from "./routes/constants/RoutePaths";
import aiRoutes from "./routes/ai/aiRoutes";

const app = express();

app.use(express.json());
app.use(RoutePaths.EVENTS, eventRoutes);
app.use(RoutePaths.AI, aiRoutes);

app.use(errorHandler);

export default app;