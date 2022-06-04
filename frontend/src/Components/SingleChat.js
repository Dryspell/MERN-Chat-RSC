import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    Box,
    FormControl,
    IconButton,
    Input,
    Spinner,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./Miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import "./styles.css";
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { userInfo, selectedChat, setSelectedChat } = ChatState();
    const user = userInfo?.data.user;

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

    const toast = useToast();

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.post(
                    "/api/message",
                    {
                        chatId: selectedChat._id,
                        message: newMessage,
                    },
                    config
                );
                console.log(`Message Sent: ${data.message}`);
                setMessages([...messages, data]);
                setNewMessage("");
                setLoading(false);
            } catch (error) {
                toast({
                    title: "Error Ocurred!",
                    description: "Failed to send Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        if (!selectedChat) return;
        console.log("Fetching Messages");
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );
            console.log(data);
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    useEffect(() => {
        fetchMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChat]);

    const typingHandler = async (e) => {
        // console.log(e.target.value);
        setNewMessage(e.target.value);

        //TODO: Set Typing Status Active
    };

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        fontFamily="Work sans"
                        display="flex"
                        w="100%"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal
                                    user={getSenderFull(
                                        user,
                                        selectedChat.users
                                    )}
                                />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchMessages={fetchMessages}
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                            </>
                        )}
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent={"flex-end"}
                        p={3}
                        w="100%"
                        h="100%"
                        bg="#E8E8E8"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <FormControl
                            onKeyDown={(e) =>
                                e.key === "Enter" ? sendMessage(e) : null
                            }
                            isRequired
                            mt={3}
                        >
                            <Input
                                placeholder="Type a message..."
                                onChange={(e) => typingHandler(e)}
                                variant="filled"
                                bg="#E0E0E0"
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                >
                    <Text fontSize={"3xl"} pb={3} fontFamily="Work sans">
                        Click on a User to Start a Chat
                    </Text>
                </Box>
            )}
        </>
    );
};

export default SingleChat;
