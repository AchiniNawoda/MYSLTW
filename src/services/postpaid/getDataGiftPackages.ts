import axios from "axios";

const getDataGiftPackages = async (
  subscriberID: string,
  packageName: string
): Promise<any | null> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found in localStorage");
      return null;
    }

    const url = `https:///omnitest.slt.com.lk/api/BBVAS/DataGiftPackages`;
    const response = await axios.get(url, {
      params: {
        subscriberID,
        packageName, 
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("API Response in getDataGiftPackages:", response.data);
      return response.data;
    } else {
      console.error("Error in getDataGiftPackages:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error in getDataGiftPackages:", error);
    return null;
  }
};

export default getDataGiftPackages;
