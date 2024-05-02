import axios from "axios";
import { MOCK_SERVER_URL } from "../utils/constants";

export const FETCH_FILE_DATA = async () => {
  try {
    const response = await axios.get(`${MOCK_SERVER_URL}/file`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
