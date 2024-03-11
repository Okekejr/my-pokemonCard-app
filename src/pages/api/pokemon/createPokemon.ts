import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, image, description, card } = req.body;
    try {
      const result = await query(
        "INSERT INTO pokemons (name, image, description, card) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, image, description, card]
      );
      res.status(201).json(result[0]);
    } catch (error) {
      console.error("Error adding pokemon:", error);
      res.status(500).json({ message: "Error adding pokemon" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
