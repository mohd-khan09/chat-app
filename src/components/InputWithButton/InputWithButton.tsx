import { TextInput, TextInputProps, ActionIcon } from '@mantine/core';
import SendButtonChat from '../SVGs/SendButtonChat';
import {
  MessageListStore,
  UserDataStore,
  useChatRoomIdStore,
  useMessageStore,
  useRoomUsersStore,
  useSocketStore,
} from '../../store';
import AttachIcon from '../SVGs/Attach';
import { useEffect, useRef, useState } from 'react';
import supabase from '../SupabaseCleint/supabaseclient';
// import EmojiPicker from 'emoji-picker-react';

export function InputWithButton(props: TextInputProps) {
  const { selectedUser } = UserDataStore();
  const { chatRoomId } = useChatRoomIdStore();
  const { socket } = useSocketStore();
  const { usersInRoom, setUsersInRoom } = useRoomUsersStore();
  const { message, setMessage } = useMessageStore();
  const { setMessageToList } = MessageListStore();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const parsedData = JSON.parse(
    localStorage.getItem('sb-bqeerxqeupnwlcywxfml-auth-token') || ''
  );
  const currentTime = new Date(Date.now());
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  useEffect(() => {
    const handleUsersInRoom = ({
      roomId,
      usernames,
    }: {
      roomId: string;
      usernames: string[];
    }) => {
      // Update the state with the list of users in the room
      setUsersInRoom(roomId, usernames);
    };

    socket?.on('users_in_room', handleUsersInRoom);

    // Clean up the event listener when the component unmounts
    return () => {
      socket?.off('users_in_room', handleUsersInRoom);
    };
  }, [setUsersInRoom, socket]);
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
  console.log('users in the room', usersInRoom);
  const sendMessage = async () => {
    if (message !== '' && message !== null) {
      const messageData = {
        room: chatRoomId,
        receiver: selectedUser?.email || '',
        sender: parsedData.user.user_metadata.email || parsedData.user.email,
        message: message,
        content: message,
        Author: parsedData.user.user_metadata.email || parsedData.user.email,
        time: hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm,
        timestamp: new Date().toISOString(),
      };
      socket?.emit('send_message', messageData);
      setMessageToList(messageData);
      setMessage('');
      const receiver = selectedUser?.email || '';
      console.log('usersInRoom:', usersInRoom);
      console.log('chatRoomId:', chatRoomId);
      console.log('receiver:', receiver);
      console.log(
        'current user email:',
        parsedData.user.user_metadata.email || parsedData.user.email
      );
      const readStatus =
        usersInRoom[chatRoomId]?.includes(receiver) &&
        usersInRoom[chatRoomId]?.includes(
          parsedData.user.user_metadata.email || parsedData.user.email
        );

      const { data, error } = await supabase.from('messages').insert([
        {
          content: message,
          sender: parsedData.user.user_metadata.email || parsedData.user.email,
          receiver: selectedUser?.email,
          roomid: chatRoomId,
          timestamp: new Date().toISOString(),
          read: readStatus,
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
