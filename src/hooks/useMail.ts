import { useState } from 'react';

export const useMail = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const send = async () => {
    await fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: `${name}`,
        Address: `${address}`,
        Message: `${message}`
      })
    });
  };

  return {
    setName,
    setMessage,
    setAddress,
    send,
  };
};
