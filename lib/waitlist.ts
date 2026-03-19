import { promises as fs } from "fs";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), "waitlist.json");

interface WaitlistEntry {
  email: string;
  joinedAt: string;
}

interface WaitlistData {
  emails: WaitlistEntry[];
}

async function readWaitlist(): Promise<WaitlistData> {
  try {
    const data = await fs.readFile(WAITLIST_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { emails: [] };
  }
}

async function writeWaitlist(data: WaitlistData): Promise<void> {
  const tmpPath = path.join(path.dirname(WAITLIST_PATH), `.waitlist-${Date.now()}.tmp.json`);
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2));
  await fs.rename(tmpPath, WAITLIST_PATH);
}

export async function hasEmail(email: string): Promise<boolean> {
  const data = await readWaitlist();
  return data.emails.some(
    (entry) => entry.email.toLowerCase() === email.toLowerCase()
  );
}

export async function addEmail(
  email: string
): Promise<{ position: number }> {
  const data = await readWaitlist();
  data.emails.push({ email: email.toLowerCase(), joinedAt: new Date().toISOString() });
  await writeWaitlist(data);
  return { position: data.emails.length + 2400 };
}
