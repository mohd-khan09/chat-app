import ChatNavBar from '../components/ChatNavBar/ChatNavBar';
import Rectangle from '../components/ChatRectangle/Rectangle';
import { InputWithButton } from '../components/InputWithButton/InputWithButton';
import MessageArea from '../components/MessagingArea/MessageArea';
import supabase from '../components/SupabaseCleint/supabaseclient';

const Home = () => {
  return (
    <div className="flex  ">
      <div>
        <Rectangle
          name="John Doe"
          nickName="@john_doe123"
          profilePictureSrc="path_to_image.jpg"
        />
      </div>
      <div className="pl-[20px]">
        <ChatNavBar />
        <MessageArea />
        <InputWithButton />
      </div>

      {/* <button onClick={HandleClick}>logout</button> */}
    </div>
  );
};

export default Home;
