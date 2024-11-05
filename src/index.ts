import "dotenv/config";
import app from "./app";
import Logger from "./logger/winston";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
});
