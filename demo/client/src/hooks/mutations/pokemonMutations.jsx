import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../lib/axios";
export function useAddPokemon() {
  const queryClient = useQueryClient();

  return useMutation(
    (newPokemon) => axiosInstance.post("/addPokemon", { newPokemon }),
    {
      // this will call the backend api for updated data by invalidating the current list
      onSuccess: (data, newPokemon, previousData) => {
        queryClient.invalidateQueries("pokemonList");
      },

      // alternatively, if we do not want to call our api again and just append the new pokemon. We could do so like this:
      // onSuccess: (data) => queryClient.setQueryData(["pokemon", { id: 5, pokemon: "Weedle" }], data),
      // https://react-query.tanstack.com/guides/updates-from-mutation-responses
    }
  );
}
