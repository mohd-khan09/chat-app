import { Button } from '@mantine/core';
import DotMenu from '../DotMenu/Menu';
import CallIcon from '../SVGs/CallIcon';
import VideoCallIcon from '../SVGs/VideoCallIcon';
import { UserDataStore } from '../../store';

const ChatNavBar = () => {
  const { selectedUser } = UserDataStore();
  return (
    <div className=" flex h-[80px] w-full flex-shrink-[0] rounded-[10px] bg-darkgreen ">
      <div className="flex items-center pl-[30px]">
        <img
          className=" h-[60px] w-[90px] items-center rounded-[50%] object-cover"
          alt=""
          src={selectedUser ? selectedUser.user_metadata.avatar_url : ''}
        />
      </div>

      <h1 className="flex w-full items-center   pl-[35px] text-[27px] font-medium text-white ">
        {selectedUser
          ? selectedUser.user_metadata.full_name
          : 'No user selected'}
      </h1>
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
