import ChatNavBar from '../components/ChatNavBar/ChatNavBar';
import Rectangle from '../components/ChatRectangle/Rectangle';
import { InputWithButton } from '../components/InputWithButton/InputWithButton';
import MessageArea from '../components/MessagingArea/MessageArea';

const Home = () => {
  return (
    <div className="flex ">
      <div className="h-full ">
        <Rectangle
          name="John Doe"
          nickName="@john_doe123"
          profilePictureSrc="path_to_image.jpg"
        />
      </div>
      <div className="w-full  pl-[20px] ">
        <ChatNavBar />
        <MessageArea />
        <InputWithButton />
      </div>
    </div>
  );
};

export default Home;
