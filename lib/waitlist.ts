import { kv } from "@vercel/kv";

const WAITLIST_KEY = "waitlist:emails";
const POSITION_OFFSET = 2400;

export async function hasEmail(email: string): Promise<boolean> {
  const exists = await kv.sismember(WAITLIST_KEY, email.toLowerCase());
  return exists === 1;
}

export async function addEmail(
  email: string
): Promise<{ position: number }> {
  await kv.sadd(WAITLIST_KEY, email.toLowerCase());
  const count = await kv.scard(WAITLIST_KEY);
  return { position: (count ?? 0) + POSITION_OFFSET };
}
