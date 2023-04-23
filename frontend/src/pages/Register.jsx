import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/Register.css";
export const RegistrationPage = () => {
  const navigate = useNavigate();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/register", values);
      if (res.data.success) {
        message.success("Register successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onfinishHandler} className="card p-4">
          <h1>Registration Form</h1>
          <Form.Item label="Name" name={"name"}>
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name={"email"}>
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required />
          </Form.Item>
          <Form.Item label="Phone no." name={"phoneNumber"}>
            <Input type="Number" required />
          </Form.Item>

          <button className="btn btn-primary" type="submit">
            Register
          </button>
          <Link to="/login" className="ms-2">
            Already login user
          </Link>
        </Form>
      </div>
    </>
  );
};
