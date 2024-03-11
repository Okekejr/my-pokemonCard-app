import { pokemonDT } from "@/types";
import { useCallback, useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<pokemonDT[]>([]);
  const [galry, setGalry] = useState<pokemonDT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.slice(0, 3));
      setGalry(result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, galry, fetchData };
};
