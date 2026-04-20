import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import eventRoutes from "./routes/event/eventRoutes";
import { RoutePaths } from "./routes/constants/RoutePaths";
import aiRoutes from "./routes/ai/aiRoutes";
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(RoutePaths.EVENTS, eventRoutes);
app.use(RoutePaths.AI, aiRoutes);

app.use(errorHandler);

export default app;