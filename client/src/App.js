import React from "react";
import Application from "./pages/Application";
import UserProvider from "./components/UserProvider";

function App() {
  
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;