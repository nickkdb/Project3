import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

function App() {
  useEffect(() => {
    addResponseMessage('Welcome to this awesome chat!');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

    return (
      <div className="App">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          // profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"
          showTimeStamp="true"
          fullScreenMode="true"
          showCloseButton="true"
        />
      </div>
    );
}

export default App;