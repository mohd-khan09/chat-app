import { Avatar, Indicator, ScrollArea } from '@mantine/core';
import BellSvg from '../SVGs/bell.svg';
import InputBar from '../InputBar/InputBar';
import Messagebox from '../MesssageBox/Messagebox';
import { useState } from 'react';
// import supabase from '../SupabaseCleint/supabaseclient';
import { UserDataStore } from '../../store';
interface RectangleBoxProps {
  name: string;
  nickName: string;
  profilePictureSrc: string;
}
interface User {
  id: number;
  avatar: string;
  userName: string;
  messageText: string;
}
const Rectangle: React.FC<RectangleBoxProps> = () => {
  const [hoveredMessageIndex, setHoveredMessageIndex] = useState(-1);
  const users = [
    {
      id: 1,
      avatar: 'avatar1.jpg',
      userName: 'Liam',
      messageText: 'When will the work be ready???',
    },
    {
      id: 2,
      avatar: 'avatar2.jpg',
      userName: 'Emma',
      messageText: 'I need more details about the project.',
    },
    {
      id: 3,
      avatar: 'avatar3.jpg',
      userName: 'Olivia',
      messageText: 'Can you provide an update on the budget?',
    },
    {
      id: 4,
      avatar: 'avatar4.jpg',
      userName: 'Noah',
      messageText: 'Im waiting for the latest design mockups.',
    },
    {
      id: 5,
      avatar: 'avatar5.jpg',
      userName: 'Ava',
      messageText: 'Are we having a meeting this week?',
    },
    {
      id: 6,
      avatar: 'avatar6.jpg',
      userName: 'William',
      messageText: 'Please share the progress report.',
    },
    {
      id: 7,
      avatar: 'avatar7.jpg',
      userName: 'Sophia',
      messageText: 'What is the deadline for this task?',
    },
    {
      id: 8,
      avatar: 'avatar8.jpg',
      userName: 'James',
      messageText: 'Can we discuss the project scope?',
    },
    {
      id: 9,
      avatar: 'avatar9.jpg',
      userName: 'Mia',
      messageText: 'I need access to the project files.',
    },
    {
      id: 10,
      avatar: 'avatar10.jpg',
      userName: 'Benjamin',
      messageText: 'Who is responsible for the documentation?',
    },
    {
      id: 11,
      avatar: 'avatar11.jpg',
      userName: 'Emily',
      messageText: 'When is the next team meeting?',
    },
    {
      id: 12,
      avatar: 'avatar12.jpg',
      userName: 'Alexander',
      messageText: 'Can you update the project timeline?',
    },
    {
      id: 13,
      avatar: 'avatar13.jpg',
      userName: 'Abigail',
      messageText: 'I have some suggestions for the design.',
    },
    {
      id: 14,
      avatar: 'avatar14.jpg',
      userName: 'Ethan',
      messageText: 'I found some bugs in the code.',
    },
    {
      id: 15,
      avatar: 'avatar15.jpg',
      userName: 'Elizabeth',
      messageText: 'Can we add more features to the app?',
    },
    {
      id: 16,
      avatar: 'avatar16.jpg',
      userName: 'Michael',
      messageText: 'I need help with my tasks.',
    },
    {
      id: 17,
      avatar: 'avatar17.jpg',
      userName: 'Charlotte',
      messageText: 'Who is in charge of the marketing?',
    },
    {
      id: 18,
      avatar: 'avatar18.jpg',
      userName: 'Daniel',
      messageText: 'I have some ideas for the project.',
    },
    {
      id: 19,
      avatar: 'avatar19.jpg',
      userName: 'Amelia',
      messageText: 'Can we change the project deadline?',
    },
    {
      id: 20,
      avatar: 'avatar20.jpg',
      userName: 'Matthew',
      messageText: 'I need the latest version of the project.',
    },
    {
      id: 21,
      avatar: 'avatar21.jpg',
      userName: 'Evelyn',
      messageText: 'Can we discuss the project budget?',
    },
  ];

  const parsedData = JSON.parse(
    localStorage.getItem('sb-bqeerxqeupnwlcywxfml-auth-token') || ''
  );
  const name = parsedData.user.user_metadata.full_name;
  const nickName = parsedData.user.user_metadata.user_name;
  const profilePictureSrc = parsedData.user.user_metadata.avatar_url;

  const { setSelectedUser } = UserDataStore();
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="h-[678px] w-[350px] rounded-xl border-[1px] border-solid border-darkslategray bg-white">
      <div className="flex flex-row pl-[30px] pt-[10px]">
        <img
          className="h-[50px] w-[50px] rounded-[50%] object-cover"
          alt=""
          src={profilePictureSrc}
        />
        <div className="pl-[10px]">
          <b className="   w-[180px] text-left text-[18px]">
            <p>{name}</p>
          </b>
          <p className=" w-[180px]  text-left text-[15px] font-extralight">
            {nickName}
          </p>
        </div>
        <div className="pt-[5px]">
          <Indicator className="  " color="red" size={8}>
            <Avatar className="" size="1.4rem" radius="sm" src={BellSvg} />
          </Indicator>
        </div>
      </div>

      <b className=" mb-[28px] ml-[30px] mt-[30px] flex text-2xl">Messages</b>
      <div className=" ml-[9px]  w-[330px]   pb-[12px]  ">
        <InputBar />
      </div>
      <div className=" h-[473px]">
        <ScrollArea
          style={{ height: '100%' }}
          scrollbarSize={8}
          scrollHideDelay={500}
        >
          {users.map((user, index) => (
            <div
              key={user.id}
              className="relative "
              onMouseEnter={() => setHoveredMessageIndex(index)} // Set the hovered message index
              onMouseLeave={() => setHoveredMessageIndex(-1)} // Reset the hovered message index when leaving
              onClick={() => handleUserClick(user)}
            >
              {/* Dark green line */}
              {hoveredMessageIndex === index && (
                <div className="absolute left-0 h-full w-[5px] bg-darkgreen transition-colors duration-200"></div>
              )}

              <div className="w-[340px] pl-2 hover:bg-dimgreen">
                {/* Message box */}

                <Messagebox
                  avatarSrc={user.avatar}
                  userName={user.userName}
                  messageText={user.messageText}
                />
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Rectangle;
