import { useEffect, useRef } from 'react';
import {
  MessageListStore,
  UserDataStore,
  useChatRoomIdStore,
  useSocketStore,
  useTypingStore,
} from '../../store';
import { Message } from '../../store';
import Avatar from 'react-avatar';
import supabase from '../SupabaseCleint/supabaseclient';

const MessageWithPhoto = () => {
  const { messageList, setMessageToList, resetMessageList } =
    MessageListStore();
  const { selectedUser } = UserDataStore();
  const { chatRoomId } = useChatRoomIdStore();
  const { setTypingStatus } = useTypingStore();
  // const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocketStore();

  const parsedData = JSON.parse(
    localStorage.getItem('sb-bqeerxqeupnwlcywxfml-auth-token') || ''
  );
  const CurrentUserEmail =
    parsedData.user.user_metadata.email || parsedData.user.email;
  const CurrentUserPhoto = parsedData.user.user_metadata.avatar_url;
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('roomid', chatRoomId)
        // .or(`sender.eq.${CurrentUserEmail},receiver.eq.${CurrentUserEmail}`)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages: ', error);
      } else if (data) {
        // console.log('messages frtched from db', data);
        data.forEach((message: Message) => {
          setMessageToList(message);
        });
      }
    };
    fetchMessages();
  }, [CurrentUserEmail, chatRoomId, setMessageToList]);

  useEffect(() => {
    const messageListener = (data: Message) => {
      // console.log('data from message area', data);
      setMessageToList(data);
    };

    socket?.on('recive_message', messageListener);

    socket?.on('userTyping', () => {
      // console.log(typingData.Author + ' is typing...');
      // setIsTyping(true);
      setTypingStatus(true);
      // Here you can set state or call a function to update your UI
    });

    // Listen for 'stopped_typing' event
    socket?.on('userStoppedTyping', () => {
      // console.log(typingData.Author + ' stopped typing...');
      // setIsTyping(false);
      setTypingStatus(false);
      // Here you can set state or call a function to update your UI
    });

    return () => {
      socket?.off('recive_message', messageListener);
      socket?.off('userTyping');
      socket?.off('userStoppedTyping');
      resetMessageList();
    };
  }, [
    resetMessageList,
    setMessageToList,
    socket,
    selectedUser,
    setTypingStatus,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);
  // console.log('istypoing', isTyping);
  //console.log('messageList', messageList);
  return (
    <>
      <div ref={containerRef}>
        {messageList.map((message, index) => (
          <div
            key={index}
            className={`flex h-full w-full pb-[20px] pt-[10px] ${
              message.sender === CurrentUserEmail
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            {message.sender === CurrentUserEmail ? (
              <>
                <div className="mr-[15px] mt-[25px]">
                  <p className="flex max-w-[600px] flex-grow rounded-[10px] bg-darkgreen pb-[14px] pl-[21px] pr-[12px] pt-[10.5px] text-left  leading-5 ">
                    {message.message || message.content}
                  </p>
                </div>
                <div className="flex-shrink-0 pr-[20px] ">
                  {CurrentUserPhoto ? (
                    <img
                      className="h-[60px] w-[60px]   rounded-[50%] object-cover"
                      alt=""
                      src={CurrentUserPhoto}
                    />
                  ) : (
                    <Avatar
                      name={CurrentUserEmail.split('@')[0]}
                      size="60"
                      round={true}
                    />
                  )}

                  <div className="pt-[6px]">
                    <p className="rounded-md bg-dimgreen ">
                      {message.time ||
                        (new Date(message.timestamp).getHours() % 12 || 12) +
                          ':' +
                          new Date(message.timestamp).getMinutes() +
                          (new Date(message.timestamp).getHours() < 12
                            ? ' AM'
                            : ' PM')}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex-shrink-0 pl-[20px]">
                  {selectedUser?.user_metadata.avatar_url ? (
                    <img
                      className="h-[60px] w-[60px] rounded-[50%] object-cover"
                      alt=""
                      src={selectedUser?.user_metadata.avatar_url}
                    />
                  ) : (
                    <Avatar
                      name={parsedData.user.email.split('@')[0]}
                      size="60"
                      round={true}
                    />
                  )}

                  <div className="pt-[6px]">
                    <p className="rounded-md bg-dimgreen ">
                      {message.time ||
                        (new Date(message.timestamp).getHours() % 12 || 12) +
                          ':' +
                          new Date(message.timestamp).getMinutes() +
                          (new Date(message.timestamp).getHours() < 12
                            ? ' AM'
                            : ' PM')}
                    </p>
                  </div>
                </div>
                <div className="ml-[15px] mt-[25px] ">
                  <p className="flex  max-w-[600px] flex-grow   rounded-[10px] bg-white pb-[14px] pl-[21px] pr-[12px] pt-[10.5px] leading-5">
                    {message.message || message.content}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default MessageWithPhoto;
