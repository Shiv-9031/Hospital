import React from "react";
import axios from "axios";
export const HomePage = () => {
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};
