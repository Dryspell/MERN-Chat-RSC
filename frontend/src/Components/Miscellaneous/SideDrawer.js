import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useToast,
    Tooltip,
    useDisclosure,
    Spinner,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
    const [search, setSearch] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loadingChat, setLoadingChat] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, setSelectedChat, chats, setChats } = ChatState();

    const navigate = useNavigate();
    const toast = useToast();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter a search query",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
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
                `/api/user?search=${search}`,
                config
            );
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post("/api/chat", { userId }, config);

            if (!chats.find((chat) => chat._id === data._id)) {
                setChats([data, ...chats]);
            }

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip
                    label="Search Users to Chat"
                    hasArrow
                    placement="bottom-end"
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <Search2Icon />
                        <Text d={{ base: "none", md: "flex" }} px="4">
                            Search Users
                        </Text>
                    </Button>
                </Tooltip>

                <Text
                    fontSize="2xl"
                    fontFamily="Work sans"
                    fontWeight={"extrabold"}
                >
                    Hay-Boi
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                                {""}
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth={"1px"}>
                            Search Users
                        </DrawerHeader>
                        <DrawerBody>
                            <Box display={"flex"} pb={2}>
                                <Input
                                    placeholder="Search by Name or Email"
                                    mr={2}
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                />
                                <Button onClick={handleSearch}>Go</Button>
                            </Box>
                            {loading ? (
                                <ChatLoading />
                            ) : (
                                searchResult?.map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() =>
                                            accessChat(user._id)
                                        }
                                    />
                                ))
                            )}
                            {loadingChat && <Spinner ml="auto" d="flex" />}
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default SideDrawer;
