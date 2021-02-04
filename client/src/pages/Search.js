import React, { useContext } from "react";
import UserContext from "../utils/UserContext";

function Search() {
    const user = useContext(UserContext);

    return (
        <div>
            Hello {user.displayName}
        </div>
    )
}

export default Search;