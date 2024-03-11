import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      await query("DELETE FROM pokemons WHERE id = $1", [id]);
      res.status(200).json({ message: "Pokemon deleted successfully" });
    } catch (error) {
      console.error("Error deleting pokemon:", error);
      res.status(500).json({ message: "Error deleting pokemon" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
