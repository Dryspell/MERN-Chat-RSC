import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/chatLogics";
import ProfileModal from "./Miscellaneous/ProfileModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { userInfo, selectedChat, setSelectedChat } = ChatState();
    const user = userInfo?.data.user;

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
                        {!selectedChat?.isGroupChat ? (
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
                                {/* <UpdateGroupChatModal
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}/> */}
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
                        MESSAGES HERE
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
