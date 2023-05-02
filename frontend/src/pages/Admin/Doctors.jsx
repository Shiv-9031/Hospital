import React from "react";
import LayOut from "../../component/LayOut";
import axios from "axios";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/UserSlice.mjs";

export default function Doctors() {
  const [doctors, setDoctors] = React.useState([]);

  //handle Account Status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/changeAccountStatus",
        {
          doctorId: record._id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("something went wrong");
    }
  };
  //get doctor function
  const getDoctor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDoctor();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName}
          {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Contact number",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="d-flex">
            {record.status === "pending" ? (
              <button
                className="btn btn-success"
                onClick={() => handleAccountStatus(record, "approved")}
              >
                Approve
              </button>
            ) : (
              <button className="btn btn-danger">Reject</button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <LayOut>
      <h1>Doctors Page</h1>
      <Table columns={columns} dataSource={doctors} />
    </LayOut>
  );
}
