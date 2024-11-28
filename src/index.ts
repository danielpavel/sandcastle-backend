import app from "./app";
import Logger from "./logger/winston";
import { env } from "./common/utils/envConfig";

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  Logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  Logger.info("sigint received, shutting down");
  server.close(() => {
    Logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
