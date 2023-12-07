import ChatNavBar from '../components/ChatNavBar/ChatNavBar';
import Rectangle from '../components/ChatRectangle/Rectangle';
import { InputWithButton } from '../components/InputWithButton/InputWithButton';
import MessageArea from '../components/MessagingArea/MessageArea';
import { useMessageStore } from '../store';

const Home = () => {
  const { message, setMessage } = useMessageStore();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  console.log('here is the message from inputBoxWithButton', message);
  console.log('message after sending is ', message);
  return (
    <div className="flex   w-full ">
      <div className="h-full ">
        <Rectangle
          name="John Doe"
          nickName="@john_doe123"
          profilePictureSrc="path_to_image.jpg"
        />
      </div>
      <div className="h-full w-full  pl-[20px] ">
        <ChatNavBar />
        <MessageArea />
        <InputWithButton value={message || ''} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default Home;
