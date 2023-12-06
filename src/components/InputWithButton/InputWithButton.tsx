import { TextInput, TextInputProps, ActionIcon } from '@mantine/core';
import SendButtonChat from '../SVGs/SendButtonChat';
import {
  MessageListStore,
  useChatRoomIdStore,
  useMessageStore,
  useSocketStore,
} from '../../store';
import AttachIcon from '../SVGs/Attach';
import { useRef, useState } from 'react';
import supabase from '../SupabaseCleint/supabaseclient';
// import EmojiPicker from 'emoji-picker-react';

export function InputWithButton(props: TextInputProps) {
  const { chatRoomId } = useChatRoomIdStore();
  const { socket } = useSocketStore();
  const { message, setMessage } = useMessageStore();
  const { setMessageToList } = MessageListStore();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const parsedData = JSON.parse(
    localStorage.getItem('sb-bqeerxqeupnwlcywxfml-auth-token') || ''
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = 20;
    const inputValue = event.target.value;

    let brokenMessage = '';
    if (!inputValue.includes(' ')) {
      for (let i = 0; i < inputValue.length; i += maxLength) {
        brokenMessage += inputValue.substring(i, i + maxLength) + '\n';
      }
      setMessage(brokenMessage.trim());
    } else {
      setMessage(inputValue);
    }
    const typingData = {
      room: chatRoomId,
      Author: parsedData.user.user_metadata.email || parsedData.user.email,
    };

    if (!isTyping) {
      socket?.emit('User_typing', typingData);
      console.log('User_typing emitted by', typingData);
      setIsTyping(true);
    }
    // If already waiting, clear the previous timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Set a timeout to emit 'stopped typing' event after 3 second of inactivity

    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit('stopped_typing', typingData);
      setIsTyping(false);
      console.log('stopped_typing emitted', typingData);
    }, 1000);
  };

  // const addDataToSupabase = async () => {
  //   const { error } = await supabase;
  // };
  const sendMessage = async () => {
    if (message !== '' && message !== null) {
      const messageData = {
        room: chatRoomId,
        receiver: chatRoomId.split('-')[1],
        sender: parsedData.user.user_metadata.email || parsedData.user.email,
        message: message,
        content: message,
        Author: parsedData.user.user_metadata.email || parsedData.user.email,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      socket?.emit('send_message', messageData);
      setMessageToList(messageData);
      setMessage('');

      const { data, error } = await supabase.from('messages').insert([
        {
          content: message,
          sender: parsedData.user.user_metadata.email || parsedData.user.email,
          receiver: chatRoomId.split('-')[1],
          roomid: chatRoomId,
          timestamp: new Date(),
        },
      ]);
      if (error) {
        console.error('Error inserting data: ', error);
        return;
      } else {
        console.log('data inserted succesfully to table messages', data);
      }
    }
  };

  // console.log('chatroom id from zustand', chatRoomId);
  return (
    <div className=" w-full ">
      <TextInput
        radius="md"
        size="xl"
        placeholder="Type a message"
        rightSectionWidth={82}
        leftSection={<AttachIcon />}
        value={message || ''}
        onChange={handleInputChange}
        rightSection={
          <ActionIcon className="  focus:outline-none " onClick={sendMessage}>
            <SendButtonChat />
          </ActionIcon>
        }
        {...props}
      />
    </div>
  );
}
