export interface PokemonT {
  count: number;
  results: pokemonDT[];
}

export interface pokemonDT {
  id: number;
  name: string;
  image?: string;
  description: string;
  card: string;
}
