import { Box } from "@chakra-ui/layout";
// import { useState } from "react";
import MyChats from "../Components/MyChats";
import SideDrawer from "../Components/Miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import ChatBox from "../Components/ChatBox";

const Chatpage = () => {
    // const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                {user && (
                    <MyChats
                    // fetchAgain={fetchAgain}
                    />
                )}
                {user && (
                    <ChatBox
                    // fetchAgain={fetchAgain}
                    // setFetchAgain={setFetchAgain}
                    />
                )}
            </Box>
        </div>
    );
};

export default Chatpage;
