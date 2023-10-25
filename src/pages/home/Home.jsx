import React, { useEffect, useState } from "react";
import { SideBar, ChatArea, AddFriends } from "./components";

import { db } from "../../../firebase.config";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  getDocs,
  or,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.config";

const Home = () => {
  const [user] = useAuthState(auth);
  const [userChatData, setUserChatData] = useState({});
  const [selectedChatId, setSelectedChatId] = useState("");
  const [selectedChat, setSelectedChat] = useState();
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserData, setCurrentUserData] = useState([]);

  const [isSender, setIsSender] = useState(true);
  const [isAddFriend, setIsAddFriend] = useState(false);

  useEffect(() => {
    const getCurrentUserData = async (userId) => {
      const userRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userRef);
      setCurrentUserData(userDocSnap.data());
    };

    if (user != null) {
      setCurrentUserId(user.uid);
      getCurrentUserData(user.uid);
    } else {
      setCurrentUserId("");
    }
  }, [user]);

  useEffect(() => {
    const getUserChatData = async (document) => {
      const receiverRef = doc(db, "users", document.data().receiverId);
      const receiverDocSnap = await getDoc(receiverRef);

      const userChatId = document.id;

      const senderRef = doc(db, "users", document.data().senderId);
      const senderDocSnap = await getDoc(senderRef);

      if (currentUserId == document.data().receiverId) {
        setIsSender(false);
      } else {
        setIsSender(true);
      }

      const chatData = {
        receiverUsername: receiverDocSnap.data().username,
        senderUsername: senderDocSnap.data().username,
        ...document.data(),
      };

      setUserChatData((prevUserChatData) => ({
        ...prevUserChatData,
        [userChatId]: chatData,
      }));
    };

    const getUserChats = async () => {
      if (user != null) {
        const userChatsRef = collection(db, "userChats");
        const q = query(
          userChatsRef,
          or(
            where("senderId", "==", user.uid),
            where("receiverId", "==", user.uid)
          )
        );
        const querySnapshot = await getDocs(q);
        const recPromises = querySnapshot.docs.map((document) =>
          getUserChatData(document)
        );
        await Promise.all(recPromises);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    if (
      Object.keys(userChatData).length > 0 &&
      selectedChatId == "" &&
      selectedChat == null
    ) {
      setSelectedChatId(Object.keys(userChatData)[0]);
      setSelectedChat(Object.values(userChatData)[0]);
    }
  }, [userChatData]);

  return (
    <>
      <header className="bg-gray-900 h-7">
        <h1 className="text-white font-semibold text-lg text-opacity-60">
          Biscorg
        </h1>
      </header>
      <div className="h-[calc(100vh-28px)] flex flex-row">
        <SideBar
          userChatData={userChatData}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          setSelectedChat={setSelectedChat}
          setIsAddFriend={setIsAddFriend}
          currentUserId={currentUserId}
        />
        {isAddFriend ? (
          <AddFriends currentUserData={currentUserData} />
        ) : (
          <ChatArea
            selectedChat={selectedChat}
            userChatData={userChatData}
            selectedChatId={selectedChatId}
            currentUserId={currentUserId}
            isSender={isSender}
          />
        )}
      </div>
    </>
  );
};

export default Home;
