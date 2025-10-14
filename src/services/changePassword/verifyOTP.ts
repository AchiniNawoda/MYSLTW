import axios from "axios";
import { OtpResponse } from "../../types/types";

const verifyOTP = async (userName: string,newPassword:string, otp: string): Promise<OtpResponse | null> => {
  try {
    // const token = localStorage.getItem("accessToken");
    // if (!token) {
    //   console.error("No access token found in localStorage");
    //   return null;
    // }

    const payload = new URLSearchParams();
    payload.append("verifyOtp", otp);
    payload.append("newPassword", newPassword);
    payload.append("userName", userName);

    console.log('Payload:', Object.fromEntries(payload));

    // const response = await axios.post(
    //   `https://omnitest.slt.com.lk/api/Account/ForgotPassword`,
    //   {
    //     verifyOtp: otp,
    //     newPassword: newPassword,
    //     userName: userName,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );

    const response = await axios.post<OtpResponse>(
      `https://omnitest.slt.com.lk/api/Account/ForgotPassword`,
      payload,
      {
        headers: {
          //Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );


    if (response.data.isSuccess) {
      console.log("Password changed successfully");
      return response.data as OtpResponse;
    } else {
      console.error("Failed to send OTP", response.data.errorMessage);
      return null;
    }
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
};
export default verifyOTP;
