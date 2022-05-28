import {
    Box,
    Button,
    Menu,
    MenuButton,
    // MenuList,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { BellIcon, Search2Icon } from "@chakra-ui/icons";
import React from "react";

const SideDrawer = () => {
    // const [search, useSearch] = React.useState("");
    // const [searchResult, setSearchResult] = React.useState([]);
    // const [loading, setLoading] = React.useState(false);
    // const [loadingChat, setLoadingChat] = React.useState(false);

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
                    <Button variant="ghost">
                        <Search2Icon />
                        <Text d={{ base: "none", md: "flex" }} px="4">
                            Search Users
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2xl" fontFamily="Work sans">
                    NuGrinder
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                </div>
            </Box>
        </>
    );
};

export default SideDrawer;
