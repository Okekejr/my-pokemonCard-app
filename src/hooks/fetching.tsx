import { PokemonT } from "@/types";
import { useCallback, useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<PokemonT["results"]>([]);
  const [galry, setGalry] = useState<PokemonT>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.results.slice(0, 3));
      setGalry(result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [url]);

  const refetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.results.slice(0, 3));
      setGalry(result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, galry, refetchData };
};
