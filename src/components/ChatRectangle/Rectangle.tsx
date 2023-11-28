import { Avatar, Indicator, ScrollArea } from '@mantine/core';
import BellSvg from '../SVGs/bell.svg';
import InputBar from '../InputBar/InputBar';
import Messagebox from '../MesssageBox/Messagebox';
import { useState } from 'react';

interface RectangleBoxProps {
  name: string;
  nickName: string;
  profilePictureSrc: string;
}
const Rectangle: React.FC<RectangleBoxProps> = ({
  name,
  nickName,
  profilePictureSrc,
}) => {
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
  ];
  return (
    <div className=" h-[678px] w-[350px] rounded-xl border-[1px] border-solid border-darkslategray bg-white">
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
          style={{ height: 473 }}
          scrollbarSize={8}
          scrollHideDelay={500}
        >
          {users.map((user, index) => (
            <div
              key={user.id}
              className="relative "
              onMouseEnter={() => setHoveredMessageIndex(index)} // Set the hovered message index
              onMouseLeave={() => setHoveredMessageIndex(-1)} // Reset the hovered message index when leaving
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
