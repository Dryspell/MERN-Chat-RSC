import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender } from "../config/chatLogics";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./Miscellaneous/GroupChatModal";

const MyChats = () => {
    const { selectedChat, setSelectedChat, userInfo, chats, setChats } =
        ChatState();
    const [loggedUser, setLoggedUser] = useState();
    const toast = useToast();

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));

        const fetchChats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get("/api/chat", config);
                setChats(data);
                // console.log(data);
            } catch (error) {
                toast({
                    title: "Error Occurred!",
                    status: "error",
                    description: "Failed to Load Chats",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        };

        fetchChats();
    }, [setChats, toast, userInfo]);

    return (
        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
            >
                My Chats
                <GroupChatModal>
                    <Button
                        display="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                    >
                        Create New Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={
                                    selectedChat === chat
                                        ? "#38B2AC"
                                        : "#E8E8E8"
                                }
                                color={
                                    selectedChat === chat ? "white" : "black"
                                }
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                            >
                                <Text>
                                    {!chat.isGroupChat
                                        ? getSender(loggedUser, chat.users)
                                        : chat.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    );
};

export default MyChats;
