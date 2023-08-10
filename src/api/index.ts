import axios from "axios";
import { Entry, ResponseAnimals } from "../types";

export async function getCards(perPage: number = 20): Promise<Entry[]> {
  const response = await axios.get<ResponseAnimals>(
    `https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${perPage}`
  );
  return response.data.entries;
}
