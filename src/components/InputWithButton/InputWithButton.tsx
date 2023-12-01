import { TextInput, TextInputProps, ActionIcon, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import SendButtonChat from '../SVGs/SendButtonChat';
import {
  MessageListStore,
  useChatRoomIdStore,
  useMessageStore,
  useSocketStore,
} from '../../store';
// import EmojiPicker from 'emoji-picker-react';

export function InputWithButton(props: TextInputProps) {
  const { chatRoomId } = useChatRoomIdStore();
  const { socket } = useSocketStore();
  const { message } = useMessageStore();
  const { setMessageToList } = MessageListStore();
  const parsedData = JSON.parse(
    localStorage.getItem('sb-bqeerxqeupnwlcywxfml-auth-token') || ''
  );
  // const HandleClick = () => {
  //   return (
  //     <div>
  //       <EmojiPicker />
  //     </div>
  //   );
  // };
  const sendMessage = async () => {
    if (message !== '' && message !== null) {
      const messageData = {
        room: chatRoomId,
        Author: parsedData.user.user_metadata.email,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      socket?.emit('send_message', messageData);
      setMessageToList(messageData);
    }
  };

  console.log('chatroom id from zustand', chatRoomId);
  return (
    <div className=" w-full ">
      <TextInput
        radius="md"
        size="xl"
        placeholder="Type a message"
        rightSectionWidth={42}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon
            className="pr-[34px] focus:outline-none"
            onClick={sendMessage}
          >
            <SendButtonChat />
          </ActionIcon>
        }
        {...props}
      />
    </div>
  );
}
