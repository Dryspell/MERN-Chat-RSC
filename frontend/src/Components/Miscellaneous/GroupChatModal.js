import {
    Button,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(
                `/api/user?search=${query}`,
                config
            );
            // console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Ocurred!",
                description: "Failed to Load Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };
    const handleGroup = () => {};
    const handleSubmit = () => {};

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize={"35px"}
                        fontFamily={"Work sans"}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display={"flex"}
                        flexDir={"column"}
                        alignItems={"center"}
                    >
                        <FormControl>
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                onChange={(e) =>
                                    setGroupChatName(e.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users eg. Peter, Paul, Mary"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {/* TODO: SELECTED USERS */}
                        {loading ? (
                            <div>
                                loading
                                <Spinner ml="auto" display="flex" />
                            </div>
                        ) : (
                            searchResult?.slice(0, 4).map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => {
                                        handleGroup(user);
                                    }}
                                />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GroupChatModal;
