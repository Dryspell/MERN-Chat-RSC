import React, { useEffect } from "react";
import axios from "axios";

const ChatPage = () => {
    const [chats, setChats] = React.useState([]);

    const fetchChats = async () => {
        const { data } = await axios.get("/api/chats");

        setChats(data);
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            {chats.map((chat) => {
                return <div key={chat._id}>{chat.chatName}</div>;
            })}
        </div>
    );
};

export default ChatPage;
