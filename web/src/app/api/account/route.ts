import { getAccount } from "@/server/data/account-data";

export async function GET() {
  try {
    const account = await getAccount();

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
