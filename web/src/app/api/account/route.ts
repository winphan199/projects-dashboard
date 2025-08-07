import { getAccount } from "@/server/data/account-data";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const account = await getAccount();
    console.log("Fetched account data:", account);

    return new Response(JSON.stringify(account), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch account data", { status: 500 });
  }
}
