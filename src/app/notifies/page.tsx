"use client";
import Container from "@/components/Container";
import React from "react";
import Cookies from "js-cookie";
import { useDeleteNotificationMutation, useGetAllNotificationsQuery, useMarkAsReadMutation } from "./api/notifies";
import { IoMailUnreadOutline } from "react-icons/io5";
import { GoRead } from "react-icons/go";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";

function Notifies() {
  const token = Cookies.get("token") || "";


  const { data: notifications, refetch } = useGetAllNotificationsQuery(token);
  const [deleteNotification] = useDeleteNotificationMutation();
  const [markAsRead] = useMarkAsReadMutation();
  console.log("👾 ~ Notifies ~ notifications:", notifications);

 const handleDelete = (id: string) => {
  deleteNotification({ token, notificationId: id })
    .unwrap() 
    .then(() => {
      toast.success("Notification deleted successfully!"); 
      refetch();
    })
    .catch((error) => {
      toast.error(`Error deleting notification: ${error.message}`);
    });
};

const handleMarkAsRead = (id: string) => {
  markAsRead({ token, notificationId: id })
    .unwrap() // Unwrap to handle promise
    .then(() => {
      toast.success("Notification marked as read!"); 
      refetch();
    })
    .catch((error) => {
      toast.error(`Error marking notification as read: ${error.message}`); 
    });
};
  return (
    <Container>
      <div className="grid p-4 bg-white rounded-lg card mt-20">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="mt-5">
          {notifications?.data?.content?.map((notify: any) => (
            <div
              key={notify.id}
              className={`p-4 ${
                notify.read ? "bg-gray-100" : "bg-[#daeafb] dark:bg-[#06203C]"
              } mb-4 rounded-lg shadow-lg border-l-4 border-primary transition duration-300`}
            >
              <div className="flex justify-between items-center gap-5">
                <div className="flex gap-2">
                  <h2 className="text-xl font-semibold text-primary">
                    {notify.title}
                  </h2>
                  <span className="text-base mt-1 text-gray-500">
                    {new Date(notify.timestamp).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className={`flex gap-2`}>
                  {notify.read ? (
                    <GoRead
                      size={25}
                      />
                    ) : (
                      <IoMailUnreadOutline
                      size={25}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleMarkAsRead(notify.id)} 
                    />
                  )}
                  <TiDeleteOutline
                    size={25}
                    className="hover:text-red-500 cursor-pointer"
                    onClick={() => handleDelete(notify.id)}
                  />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p className="text-lg text-gray-800">{notify.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Notifies;
