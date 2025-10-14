import axios from "axios";


interface ApiResponse {
  isSuccess: boolean;
  dataBundle?: any;
  message?: string;
}

const upgradePackage = async (
  subscriberID: string,
  type: string,
  username: string,
  contactMobile: string,
  email: string,
  existingPackage: string,
  newPackage: string,
  currentMonthlyValue: string,
  newMonthlyValue: string,
  nic?: string
): Promise<ApiResponse | null> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return null;
    }

    const url = new URL("https://omnitest.slt.com.lk/api/BBExternal/BBPackageChangeRequest");
    const params = new URLSearchParams({
      subscriberID,
      type,
      name: username,
      contactMobile,
      email,
      exsistingPackage: existingPackage,
      newPackage,
      currentMonthlyValue,
      newMonthlyValue,
      changeType: "upgrade",
      commitUser: "MySLTWeb",
      channel: "WEB",
      ...(nic && { nic }),
    });

    const response = await axios.post(`${url}?${params.toString()}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data?.isSuccess) {
      return response.data;
    }
    console.error("Package upgrade failed:", response.data?.message);
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

export default upgradePackage;