import React, { useState } from "react";
import {
  AiFillCustomerService,
  AiFillMessage,
  AiFillPhone,
  AiOutlinePlusSquare,
} from "react-icons/ai";

const SideBar = (props) => {
  const [selectedButton, setSelectedButton] = useState("messageSideButton");

  const handleButtonClick = (e) => {
    e.preventDefault();
    setSelectedButton(e.currentTarget.id);
  };

  const handleChatClick = (e) => {
    e.preventDefault();
    props.setSelectedChatId(e.currentTarget.id);
    props.setSelectedChat(props.userChatData[e.currentTarget.id]);
    props.setIsAddFriend(false);
  };

  const handleAddFriendClick = (e) => {
    e.preventDefault();
    props.setIsAddFriend(true);
    props.setSelectedChatId("");
    props.setSelectedChat();
  };

  const SideBarIcon = ({ icon, idName }) => {
    return (
      <button
        onClick={handleButtonClick}
        id={idName}
        className={`w-16 h-16 text text-center ${
          selectedButton == idName
            ? "bg-pink-400 text-gray-700 rounded-xl"
            : "bg-gray-700 text-pink-400 rounded-3xl"
        } mt-5 flex justify-center items-center hover:bg-pink-400 hover:text-gray-700 hover:rounded-xl transition-all duration-300 ease-linear`}
      >
        {icon}
      </button>
    );
  };

  const SidePanel = () => {
    const userChatDataArray = Object.entries(props.userChatData);
    return (
      <div className="flex flex-col bg-gray-800 h-[calc(100vh-28px)] w-72">
        <div
          onClick={handleAddFriendClick}
          className={`bg-gray-900 text-pink-400 mx-2 my-2 py-4 rounded-md flex flex-row items-center hover:cursor-pointer hover:bg-gray-700 hover:text-gray-900 transition-all duration-200 ease-linear`}
        >
          <AiOutlinePlusSquare className="mx-3" size="30" />
          <p className="pl-1 text-gray-400 font-medium text-lg">Add friend</p>
        </div>

        {userChatDataArray.map(([key, value], index) => (
          <PanelLabel
            key={index}
            receiver={
              props.currentUserId == value.senderId
                ? value.receiverUsername
                : value.senderUsername
            }
            idName={key}
          />
        ))}
      </div>
    );
  };

  const PanelLabel = ({ idName, receiver }) => {
    return (
      <div
        onClick={handleChatClick}
        id={idName}
        className={`${
          props.selectedChatId == idName ? "bg-gray-700" : "bg-gray-800"
        }  mx-2 my-2 py-4 rounded-md flex flex-row items-center hover:cursor-pointer hover:bg-gray-700`}
      >
        <img
          src={"/src/assets/anon_icon.jpg"}
          className="w-10 h-10 rounded-full mx-3"
        />
        <p className="pl-1 text-gray-400 font-medium text-lg">{receiver}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col bg-gray-900 h-[calc(100vh-28px)] w-20 space-y-5 items-center">
        <SideBarIcon
          icon={<AiFillMessage size="30" />}
          idName="messageSideButton"
        />
        <SideBarIcon
          icon={<AiFillPhone size="30" />}
          idName="phoneSideButton"
        />
        <SideBarIcon
          icon={<AiFillCustomerService size="30" />}
          idName="musicSideButton"
        />
      </div>
      <SidePanel />
    </div>
  );
};

export default SideBar;
