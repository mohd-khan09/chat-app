import ChatNavBar from '../components/ChatNavBar/ChatNavBar';
import Rectangle from '../components/ChatRectangle/Rectangle';
import { InputWithButton } from '../components/InputWithButton/InputWithButton';
import MessageArea from '../components/MessagingArea/MessageArea';
import supabase from '../components/SupabaseCleint/supabaseclient';

const Home = () => {
  // const HandleClick = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   console.log('signoutcalled');
  //   if (error) {
  //     console.log(error);
  //   }
  // };
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
