import React from "react";
import LayOut from "../../component/LayOut";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = React.useState();
  const prams = useParams();

  //getDoctor detail

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/doctor/getDoctorInfo",
        {
          useId: prams.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getDoctorInfo();
  }, []);
  return (
    <LayOut>
      <h1>Profile Page</h1>
    </LayOut>
  );
};
