import React, { useState } from "react";
import { Input, Button, Dropdown, Menu, Avatar } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  SendOutlined,
  SmileOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState("Chukwuma");
  const [messageInput, setMessageInput] = useState("");

  const chats = [
    {
      id: 1,
      name: "Aisha Doe",
      message: "Sure, I'll get them to you on time.",
      time: "10:07 AM",
      pinned: true,
      avatar: "https://via.placeholder.com/32",
      status: "Available",
    },
    {
      id: 2,
      name: "Chukwuma",
      message: "Can we schedule a meeting for tomorrow?",
      time: "10:07 AM",
      pinned: true,
      avatar: "https://via.placeholder.com/32",
      status: "Available",
    },
    {
      id: 3,
      name: "Edward",
      message: "Hi, how are you today?",
      time: "10:07 AM",
      pinned: true,
      avatar: "https://via.placeholder.com/32",
      status: "Busy",
    },
    {
      id: 4,
      name: "Olamide",
      message: "Sure, I'll get them to you on time.",
      time: "10:07 AM",
      pinned: false,
      avatar: "https://via.placeholder.com/32",
      status: "Offline",
    },
    {
      id: 5,
      name: "Jide",
      message: "Sure, I'll get them to you on time.",
      time: "10:07 AM",
      pinned: false,
      avatar: "https://via.placeholder.com/32",
      status: "Available",
    },
  ];

  const messages = [
    { sender: "Chukwuma", text: "Good Morning ma'am", time: "10:07 AM" },
    {
      sender: "Me",
      text: "Good Morning, I'll need those reports by 3 PM, please.",
      time: "10:07 AM",
    },
    {
      sender: "Chukwuma",
      text: "Sure, I'll get them to you on time",
      time: "10:07 AM",
    },
    {
      sender: "Me",
      text: "Also, I hope you had a chance to review the project updates I sent last Friday.",
      time: "10:07 AM",
    },
    {
      sender: "Chukwuma",
      text: "Yes, I've seen the project updates. I'll have them ready before the general meeting today.",
      time: "10:07 AM",
    },
    {
      sender: "Me",
      text: "Can we schedule a meeting for tomorrow?",
      time: "10:07 AM",
    },
  ];

  const handleSend = () => {
    console.log("Sent message:", messageInput);
    setMessageInput(""); // Clear input after sending
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4">Messages</h2>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search by name, group, chat..."
            prefix={<SearchOutlined />}
          />
          <Button icon={<FilterOutlined />} />
        </div>
        <div>
          <h3 className="text-gray-500 text-sm mb-2">Pinned Messages</h3>
          {chats
            .filter((chat) => chat.pinned)
            .map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${
                  selectedChat === chat.name ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedChat(chat.name)}
              >
                <Avatar src={chat.avatar} />
                <div>
                  <h4 className="font-semibold">{chat.name}</h4>
                  <p className="text-sm text-gray-500">{chat.message}</p>
                </div>
                <span className="text-sm text-gray-400 ml-auto">
                  {chat.time}
                </span>
              </div>
            ))}
        </div>
        <div>
          <h3 className="text-gray-500 text-sm mt-4 mb-2">All Messages</h3>
          {chats
            .filter((chat) => !chat.pinned)
            .map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${
                  selectedChat === chat.name ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedChat(chat.name)}
              >
                <Avatar src={chat.avatar} />
                <div>
                  <h4 className="font-semibold">{chat.name}</h4>
                  <p className="text-sm text-gray-500">{chat.message}</p>
                </div>
                <span className="text-sm text-gray-400 ml-auto">
                  {chat.time}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-4 flex flex-col">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h2 className="text-lg font-bold">{selectedChat}</h2>
            <p className="text-sm text-green-500">Available</p>
          </div>
          <div className="flex gap-2">
            <Button icon={<MoreOutlined />} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.sender === "Me" ? "text-right" : "text-left"
              }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.sender === "Me"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.text}
              </p>
              <p className="text-xs text-gray-400 mt-1">{message.time}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2 items-center">
          <Input
            placeholder="Type your message here..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1"
          />
          <Button icon={<SmileOutlined />} />
          <Button icon={<PaperClipOutlined />} />
          <Button icon={<SendOutlined />} type="primary" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
