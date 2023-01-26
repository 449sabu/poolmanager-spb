export const useMail = () => {
  const send = async (value: any) => {
    const res = await fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    return await res.json();
  };

  return {
    send,
  };
};
