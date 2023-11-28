import CallIcon from '../SVGs/CallIcon';
import VideoCallIcon from '../SVGs/VideoCallIcon';
import ThreeDots from '../SVGs/three-dots-vertical';

const ChatNavBar = () => {
  return (
    <div className="flex ">
      <div className=" flex h-[90px] w-[1100px] flex-shrink-[0] rounded-[10px] bg-darkgreen pl-[34px] pt-[15px]">
        <img
          className="h-[60px] w-[60px] rounded-[50%] object-cover"
          alt=""
          src="avatar6.jpg"
        />
        <h1 className="pl-[35px] pt-[14px] text-[27px] font-medium text-white ">
          Moahmmed khan
        </h1>
        <div className="ml-[550px] flex w-[190px] items-center justify-between pb-[16px] ">
          <CallIcon />

          <VideoCallIcon />
          <ThreeDots />
        </div>
      </div>
    </div>
  );
};

export default ChatNavBar;
