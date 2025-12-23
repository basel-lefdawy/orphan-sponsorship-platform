import axios from "axios";

const BASE_URL = "https://694988891282f890d2d67124.mockapi.io/orphandata";

export const getOrphans = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
