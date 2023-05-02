import React from "react";
import LayOut from "../../component/LayOut";
import axios from "axios";
import { Table } from "antd";

export default function Users() {
  const [users, setUsers] = React.useState([]);

  //getUser function
  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  // antD table col

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  return (
    <LayOut>
      <h1>user list</h1>
      <Table columns={columns} dataSource={users} />
    </LayOut>
  );
}
