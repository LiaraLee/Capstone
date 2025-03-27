// MessageDisplay.jsx
import React from 'react';

const MessageDisplay = ({ message }) => {
  return message ? <div className="message">{message}</div> : null;
};

export default MessageDisplay;

  