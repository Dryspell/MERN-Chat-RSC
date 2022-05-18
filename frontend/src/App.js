import "./App.css";
// import { Button } from "@chakra-ui/button";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";

function App() {
    return (
        <div className="App">
            {/* <Button colorScheme="blue">Button</Button> */}

            <Routes>
                <Route path="/" component={<Homepage />} />
                <Route path="/chats" component={<ChatPage />} />
            </Routes>
        </div>
    );
}

export default App;
