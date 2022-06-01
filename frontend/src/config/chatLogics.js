export const getSender = (loggedUser, users) => {
    // console.log(loggedUser, users);
    if (loggedUser) {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    } else {
        throw new Error("Logged user not found");
        return "GODHASFORSAKENYOU";
    }
};

export const getSenderFull = (loggedUser, users) => {
    // console.log(loggedUser, users);
    if (loggedUser) {
        return users[0]._id === loggedUser._id ? users[1] : users[0];
    } else {
        return "THEDEVILHASFORSAKENYOU";
    }
};
