import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";

const ADMIN_KEYPAIR = getKeypairFromEnvironment("ADMIN_PRIVATE_KEY");

const CONFIG = {
  ADMIN_KEYPAIR,
};

export default CONFIG;
