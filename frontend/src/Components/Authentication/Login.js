import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [showPass, setShowPass] = useState(false);

    const handleShowPass = () => {
        setShowPass(!showPass);
    };

    const handleSubmit = (e) => {};

    return (
        <VStack spacing="5px">
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowPass}>
                            {showPass ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                color="white"
                onClick={handleSubmit}
                style={{ marginTop: 15 }}
            >
                Login
            </Button>
            <Button
                colorScheme="red"
                width="100%"
                color="white"
                onClick={() => {
                    setName("Guest");
                    setPassword("12guest34");
                    handleSubmit();
                }}
                style={{ marginTop: 15 }}
            >
                Chat as a Guest
            </Button>
        </VStack>
    );
};

export default Login;
