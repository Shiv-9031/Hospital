import React from "react";
import LayOut from "../component/LayOut";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/Alertslice.mjs";
import { setUser } from "../redux/features/UserSlice.mjs";
import axios from "axios";

export default function NotificationPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/get-all-notification",
        { useId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(setUser(res.data.data));
      } else {
        message.error("went something wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/delete-all-notification",
        { useId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(setUser(res.data.data));
      } else {
        message.error("went something wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <LayOut>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={[1]}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleMarkAllRead}
              style={{ cursor: "pointer" }}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification?.map((notificationMsg) => {
            return (
              <div
                className="card"
                onClick={() => navigate(notificationMsg.data.onClickPath)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-text">{notificationMsg.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={[0]}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleDeleteAllRead}
              style={{ cursor: "pointer" }}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification?.map((notificationMsg) => {
            return (
              <div
                className="card"
                onClick={() => navigate(notificationMsg.data.onClickPath)}
                style={{
                  cursor: "pointer",
                  margin: "5px 0",
                  border: "1px solid black",
                }}
              >
                <div className="card-text" style={{ padding: "5px 10px" }}>
                  {notificationMsg.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </LayOut>
  );
}
