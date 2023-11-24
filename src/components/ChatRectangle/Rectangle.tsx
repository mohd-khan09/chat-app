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
    <div className="absolute  left-[49px] top-[26px] box-border h-[678px] w-[325px] rounded-xl border-[1px] border-solid border-darkslategray bg-white">
      <img
        className="absolute left-[16px] top-[12px] h-[50px] w-[50px] rounded-[50%] object-cover"
        alt=""
        src={profilePictureSrc}
      />
      <b className="absolute left-[56px] top-[14px] h-[9.1px]  w-[155px]  pl-[20px] text-left text-[18px]">
        <p>{name}</p>
      </b>
      <div className="absolute left-[40px] top-[35px]  h-3 w-[220px]  text-[15px] font-extralight">
        <p> {nickName}</p>
      </div>
      <Indicator
        className="absolute left-[269px] top-[20px] h-8 w-6 "
        color="red"
        size={8}
      >
        <Avatar className="" size="1.4rem" radius="sm" src={BellSvg} />
      </Indicator>
      <b className="absolute left-[18px] top-[95px] w-[155px] text-left text-2xl">
        Messages
      </b>
      <div className=" ml-[7px] mt-[145px] w-[294px]   pb-[12px]  ">
        <InputBar />
      </div>
      <div className="  h-[473px] overflow-y-auto">
        <ScrollArea
          style={{ height: 473 }}
          scrollbarSize={8}
          scrollHideDelay={500}
        >
          {users.map((user, index) => (
            <div
              key={user.id}
              className="relative w-[306px]"
              onMouseEnter={() => setHoveredMessageIndex(index)} // Set the hovered message index
              onMouseLeave={() => setHoveredMessageIndex(-1)} // Reset the hovered message index when leaving
            >
              {/* Dark green line */}
              {hoveredMessageIndex === index && (
                <div className="absolute left-0 h-full w-[5px] bg-darkgreen transition-colors duration-200"></div>
              )}

              {/* Card content */}
              <div className="w-[309px] pl-2 hover:bg-dimgreen">
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
