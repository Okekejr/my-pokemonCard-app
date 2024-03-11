import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pokemons = await query("SELECT * FROM pokemons");
    res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    res.status(500).json({ message: "Error fetching pokemons" });
  }
}
