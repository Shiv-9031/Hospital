import React from "react";
import axios from "axios";
import LayOut from "../component/LayOut";
export const HomePage = () => {
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/getUserData",
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
      <LayOut>
        <h1>Home page</h1>
      </LayOut>
    </div>
  );
};
