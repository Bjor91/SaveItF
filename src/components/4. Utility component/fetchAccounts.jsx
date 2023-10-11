import axios from "axios";

export const fetchAccounts = async (setAccountData) => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/accounts");
    setAccountData(response.data);
  } catch (error) {
    console.error("Error fetching accounts", error);
  }
};
