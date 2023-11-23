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

      <button onClick={HandleClick}>logout</button>
    </div>
  );
};

export default Home;
