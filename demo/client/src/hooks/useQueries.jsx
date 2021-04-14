import axiosInstance from "../lib/axios";
import { useQuery } from "react-query";

export function usePokemonList() {
  return useQuery(
    "pokemonList",
    async () => {
      const { data } = await axiosInstance.get("/pokemonList");
      return data;
    },
    {
      initialData: [],
    }
  );
}
