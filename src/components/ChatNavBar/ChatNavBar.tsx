import { Button } from '@mantine/core';
import DotMenu from '../DotMenu/Menu';
import CallIcon from '../SVGs/CallIcon';
import VideoCallIcon from '../SVGs/VideoCallIcon';
import { OnlineUsersStore, UserDataStore, useTypingStore } from '../../store';
// import { useSocketStore } from '../../store';
// import { useEffect, useState } from 'react';
const ChatNavBar = () => {
  const { selectedUser } = UserDataStore();
  // const { socket } = useSocketStore();
  const { isTyping } = useTypingStore();
  const { onlineUsers } = OnlineUsersStore();
  const isReceiverOnline = onlineUsers.includes(
    selectedUser?.user_metadata.email || ''
  );

  return (
    <div className=" flex h-[80px] w-full flex-shrink-[0] rounded-[10px] bg-darkgreen ">
      <div className="flex items-center pl-[30px]">
        <img
          className=" h-[60px] w-[90px] items-center rounded-[50%] object-cover"
          alt=""
          src={selectedUser ? selectedUser.user_metadata.avatar_url : ''}
        />
      </div>
      <div className="flex w-full flex-col justify-center">
        <h1 className=" pl-[35px]  text-left text-[27px] font-medium  text-white">
          {selectedUser
            ? selectedUser.user_metadata.full_name
            : 'No user selected'}
        </h1>
        {isTyping ? (
          <p className="pl-[35px] text-left  text-white">is typing...</p>
        ) : (
          isReceiverOnline && (
            <p className="pl-[35px] text-left  text-white">Online</p>
          )
        )}
      </div>

      <div className=" flex w-[190px] items-center justify-end  ">
        <Button className="focus:outline-none">
          <CallIcon />
        </Button>
        <Button className="focus:outline-none">
          <VideoCallIcon />
        </Button>
        <DotMenu />
      </div>
    </div>
  );
};

export default ChatNavBar;
