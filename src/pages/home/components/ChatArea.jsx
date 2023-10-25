import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  getDocs,
  collection,
  orderBy,
  query,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../firebase.config";

const ChatArea = (props) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [otherUsername, setOtherUsername] = useState("");
  const [thisUsername, setThisUsername] = useState("");

  const dummy = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      createdAt: Timestamp.now(),
      message: text,
      uid: props.currentUserId,
    };
    console.log(newMessage);
    const docRef = await addDoc(
      collection(db, "userChats", props.selectedChatId, "messages"),
      newMessage
    );
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setText("");
  };

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (
      Object.keys(props.userChatData).length > 0 &&
      props.selectedChatId != ""
    ) {
      if (props.isSender) {
        setOtherUsername(
          props.userChatData[props.selectedChatId].receiverUsername
        );
        setThisUsername(
          props.userChatData[props.selectedChatId].senderUsername
        );
      } else {
        setOtherUsername(
          props.userChatData[props.selectedChatId].senderUsername
        );
        setThisUsername(
          props.userChatData[props.selectedChatId].receiverUsername
        );
      }

      setMessages([]);
    }
  }, [props.userChatData, props.selectedChatId]);

  useEffect(() => {
    const getMessages = async () => {
      if (props.selectedChatId != "") {
        const q = query(
          collection(db, "userChats", props.selectedChatId, "messages"),
          orderBy("createdAt")
        );
        const querySnapshot = await getDocs(q);
        let newMessages = [];
        querySnapshot.forEach((doc) => {
          newMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(newMessages);
      }
    };
    getMessages();
  }, [props.selectedChatId]);

  const MessageDisplay = ({ message, uid }) => {
    return (
      <div className="flex bg-gray-600 w-auto h-auto px-3 mx-4 my-2 rounded-md items-center">
        <img
          src={"/src/assets/anon_icon.jpg"}
          className="w-14 h-14 rounded-full my-3"
        />
        <div className="mx-2 h-auto w-auto py-3 px-2 flex flex-col">
          <p className="text-lg font-semibold text-white">
            {uid == props.currentUserId ? thisUsername : otherUsername}
          </p>
          <p className="text-white">{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-[calc(100vh-28px)] relative flex-col">
      <main className="flex h-[calc(100vh-138px)] mt-2 flex-col w-full overflow-y-scroll">
        {messages.map((data, index) => (
          <MessageDisplay key={index} message={data.message} uid={data.uid} />
        ))}
        <div ref={dummy} />
      </main>
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={text}
          className="flex w-full h-14 inset-x-0 bottom-0 rounded-md px-4 mx-4 mt-5 bg-gray-600 outline-none caret-white text-white"
          placeholder="Type something..."
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default ChatArea;
