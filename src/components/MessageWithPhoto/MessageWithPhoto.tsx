import { useEffect, useRef } from 'react';
import { MessageListStore, useSocketStore } from '../../store';

const MessageWithPhoto = () => {
  const { messageList, setMessageToList } = MessageListStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocketStore();
  useEffect(() => {
    socket?.on('recive_message', (data) => {
      console.log('data from message area', data);
      setMessageToList(data);
      //
    });
  }, [setMessageToList, socket]);
  const parsedData = JSON.parse(
    localStorage.getItem('sb-bqeerxqeupnwlcywxfml-auth-token') || ''
  );
  const CurrentUserEmail = parsedData.user.user_metadata.email;
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  return (
    <>
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`flex h-full w-full pb-[20px]  ${
            message.Author === CurrentUserEmail
              ? 'justify-end'
              : 'justify-start'
          }`}
        >
          {message.Author === CurrentUserEmail ? (
            <>
              <div className="mr-[15px] mt-[25px]">
                <p className="flex max-w-[600px] flex-grow rounded-[10px] bg-white pb-[14px] pl-[21px] pr-[12px] pt-[10.5px] leading-5">
                  {message.message}
                </p>
              </div>
              <div className="flex-shrink-0 pr-[20px]">
                <img
                  className="h-[60px] w-[60px]  rounded-[50%] object-cover"
                  alt=""
                  src="avatar1.jpg"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex-shrink-0 pl-[20px]">
                <img
                  className="h-[60px] w-[60px] rounded-[50%] object-cover"
                  alt=""
                  src="avatar6.jpg"
                />
              </div>
              <div className="ml-[15px] mt-[25px] ">
                <p className="flex  max-w-[600px] flex-grow   rounded-[10px] bg-white pb-[14px] pl-[21px] pr-[12px] pt-[10.5px] leading-5">
                  {message.message}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default MessageWithPhoto;
