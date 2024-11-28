// backend/src/server.ts
import { Request, Response } from "express";
import { Transaction } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { StatusCodes } from "http-status-codes";

const ADMIN_KEYPAIR = getKeypairFromEnvironment("ADMIN_PRIVATE_KEY");

export async function marketplaceAdminSign(req: Request, res: Response) {
  try {
    const { serializedTx, userPubkey } = req.body;

    // Verify user's request
    if (!isValidRequest(userPubkey)) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid request");
    }

    // TOOD - Check Redis for rate limiting per user
    // const userRequests = await redis.incr(`user:${userPubkey}:requests`);
    // await redis.expire(`user:${userPubkey}:requests`, 3600); // 1 hour

    //if (userRequests > 10) {
    //  // Max 10 requests per hour per user
    //  return res.status(429).send("Too many requests");
    //}

    // Deserialize and verify transaction
    const transaction = Transaction.from(Buffer.from(serializedTx, "base64"));

    // Verify transaction contents
    if (!isValidTransaction(transaction)) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid transaction");
    }

    // Sign with admin key
    transaction.partialSign(ADMIN_KEYPAIR);

    // Return signed transaction
    const signedTx = transaction.serialize().toString("base64");

    res.json({ signedTx });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
  }
}

function isValidTransaction(transaction: Transaction): boolean {
  // Implement transaction validation logic:
  // - Verify program ID
  // - Check instruction data
  // - Validate accounts
  // - Check for suspicious patterns
  return true;
}

function isValidRequest(userPubkey: string): boolean {
  // Implement request validation:
  // - Check user allowlist if needed
  // - Verify signature/auth token
  // - Additional security checks
  return true;
}
