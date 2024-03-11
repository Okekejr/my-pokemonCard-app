import { db } from "@vercel/postgres";

// const database = new Pool({
//   user: process.env.NEXT_PUBLIC_DB_USER,
//   host: process.env.NEXT_PUBLIC_DB_HOST,
//   database: process.env.NEXT_PUBLIC_DB,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
// });

export const query = async (text: string, params: any[] = []) => {
  const client = await db.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
};
