import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase.config";

const AddFriends = (props) => {
  const [text, setText] = useState("");
  const [friendUserData, setFriendUserData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", text));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFriendUserData((previousFriendUserData) => [
        ...previousFriendUserData,
        doc.data(),
      ]);
    });
  };

  useEffect(() => {
    console.log(friendUserData);
    console.log(props.currentUserData);
  }, [friendUserData]);

  const onClearClick = (e) => {
    e.preventDefault();
    if (text != "") {
      setText("");
    }
    console.log(props.currentUserData.friends);
  };

  const UserDisplay = () => {
    return (
      <div className="mt-5">
        {friendUserData.map((data, index) => (
          <UserPanel userData={data} key={index} />
        ))}
      </div>
    );
  };

  const UserPanel = ({ userData }) => {
    return (
      <div className="flex relative bg-gray-600 w-auto h-auto px-3 mx-4 my-2 rounded-md items-center">
        <img
          src={"/src/assets/anon_icon.jpg"}
          className="w-14 h-14 rounded-full my-3"
        />
        <p className="mx-4 font-semibold text-xl text-gray-400">
          {userData.username}
        </p>
        <button className="bg-slate-300 p-2 rounded-md font-semibold absolute right-0 mx-3 hover:bg-slate-100">
          {props.currentUserData.friends.includes(userData.uid)
            ? "friend"
            : "add friend"}
        </button>
      </div>
    );
  };

  return (
    <div className="flex w-full h-[calc(100vh-28px)] relative flex-col bg-blue-200">
      <div
        className="flex flex-row mt-5 bg-green-200 w-full"
        onSubmit={handleSubmit}
      >
        <form className="flex w-full">
          <input
            type="text"
            value={text}
            className="flex w-full h-14 rounded-l-md px-4 ml-4 bg-gray-600 outline-none caret-white text-white"
            placeholder="Search username"
            onChange={(e) => {
              e.preventDefault();
              setText(e.target.value);
            }}
          />
        </form>
        <button
          className="w-fit h-14 place-self-center rounded-r-md mr-4 bg-gray-600 pr-3 pl-2 text-white"
          disabled={text == ""}
          onClick={onClearClick}
        >
          {text == "" ? <AiOutlineSearch size="30" /> : <RxCross2 size="30" />}
        </button>
      </div>
      <UserDisplay />
    </div>
  );
};

export default AddFriends;
