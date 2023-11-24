import Rectangle from '../components/ChatRectangle/Rectangle';
import supabase from '../components/SupabaseCleint/supabaseclient';

const Home = () => {
  const HandleClick = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('signoutcalled');
    if (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>home page </h1>
      <Rectangle
        name="John Doe"
        nickName="@john_doe123"
        profilePictureSrc="path_to_image.jpg"
      />
      <button onClick={HandleClick}>logout</button>
    </div>
  );
};

export default Home;
