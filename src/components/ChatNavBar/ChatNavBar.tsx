import { Button } from '@mantine/core';
import DotMenu from '../DotMenu/Menu';
import CallIcon from '../SVGs/CallIcon';
import VideoCallIcon from '../SVGs/VideoCallIcon';

const ChatNavBar = () => {
  return (
    <div className=" flex h-[80px] w-full flex-shrink-[0] rounded-[10px] bg-darkgreen ">
      <div className="flex items-center">
        <img
          className=" h-[60px] w-[60px] items-center rounded-[50%] object-cover"
          alt=""
          src="avatar6.jpg"
        />
      </div>

      <h1 className="flex w-[850px] items-center   pl-[35px] text-[27px] font-medium text-white ">
        Moahmmed khan
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
