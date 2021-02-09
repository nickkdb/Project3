import React, { useContext } from "react";
import UserContext from "../utils/UserContext";

function Profile() {
    const user = useContext(UserContext);

    return (
        <div>
            Hello {user.displayName}
        </div>
    )
}

export default Profile;