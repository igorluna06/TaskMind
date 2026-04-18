import app from "./app";
import { ServerMessages } from "./constants/ServerMessages";

const port = Number(process.env.PORT);

if (!port || isNaN(port)) {
  throw new Error("PORT is not defined or invalid in .env");
}

app.listen(port, () => {
  console.log(ServerMessages.RUNNING(port));
});
