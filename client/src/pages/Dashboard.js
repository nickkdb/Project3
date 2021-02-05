import React, { useContext } from "react";
import UserContext from "../utils/UserContext";

function Dashboard() {
    const user = useContext(UserContext);

    return (
        <div>
            Hello {user.displayName}
        </div>
    )
}

export default Dashboard;