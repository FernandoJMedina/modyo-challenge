import { useQuery } from "react-query";
import { QueryKeys } from "../types";
import { getCards } from "../api";

export function useCards(perPage?: number) {
  return useQuery({
    queryKey: QueryKeys.animals,
    queryFn: () => getCards(perPage),
  });
}
