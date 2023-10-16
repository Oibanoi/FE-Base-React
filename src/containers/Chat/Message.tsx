export const Message = ({ message }: { message: any }) => {
  if (message.type === 'join') return <p>{`${message.sid} just joined`}</p>;
  if (message.type === 'chat')
    return <p>{`${message.sid}: ${message.message}`}</p>;
  return <></>;
};
