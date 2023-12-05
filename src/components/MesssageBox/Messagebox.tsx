import React from 'react';
import Avatar from 'react-avatar';
// import avatar from '../SVGs/avatar.svg';
interface MessageboxProps {
  avatarSrc: string;
  userName: string;
  messageText: string;
}
const Messagebox: React.FC<MessageboxProps> = ({
  avatarSrc,
  userName,
  messageText,
}) => {
  return (
    <div className="  h-[94.8px] w-[330px]  rounded-b border-b  border-gray-300  text-[34px] font-medium text-black ">
      <div className=" flex  pl-[15px] pt-[17.3px]">
        {avatarSrc ? (
          <img
            className="h-[60px] w-[60px]  rounded-[50%] object-cover  "
            alt=""
            src={avatarSrc}
          />
        ) : (
          <Avatar name={userName} size="60" round={true} />
        )}
        <div className="flex flex-col">
          <div className=" h-[25px] w-[200px]   pb-[10px] pl-[10px] text-left text-[20px]">
            <p>{userName}</p>
          </div>
          <div className=" left-[74px] top-[245px] mt-1 inline-block h-[40px] w-[222px]  pl-[12px] text-left text-[15px]  font-thin leading-4  ">
            <p>{messageText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messagebox;
