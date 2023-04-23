import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Register.css";
export const Login = () => {
  const navigate = useNavigate();

  //form handler

  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/login", values);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("login successfully");

        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onfinishHandler} className="card p-4">
          <h1>Login Form</h1>

          <Form.Item label="Email" name={"email"}>
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" required />
          </Form.Item>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link to="/register" className="ms-2">
            Not a user Register here
          </Link>
        </Form>
      </div>
    </>
  );
};
