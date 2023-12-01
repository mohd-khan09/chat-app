import { Avatar, Indicator, ScrollArea } from '@mantine/core';
import BellSvg from '../SVGs/bell.svg';
import InputBar from '../InputBar/InputBar';
import Messagebox from '../MesssageBox/Messagebox';
import { useEffect, useState } from 'react';
// import supabase from '../SupabaseCleint/supabaseclient';
import {
  ListOfAllUersStore,
  User,
  UserDataStore,
  useChatRoomIdStore,
  useSocketStore,
} from '../../store';
import supabase from '../SupabaseCleint/supabaseclient';
import io from 'socket.io-client';
interface RectangleBoxProps {
  name: string;
  nickName: string;
  profilePictureSrc: string;
}

const Rectangle: React.FC<RectangleBoxProps> = () => {
  const [hoveredMessageIndex, setHoveredMessageIndex] = useState(-1);
  const { userss, setUserss } = ListOfAllUersStore();
  const { socket, setSocket } = useSocketStore();
  const { chatRoomId, setChatRoomId } = useChatRoomIdStore();
  useEffect(() => {
    const socketIo = io('http://localhost:3001');
    setSocket(socketIo);

    // Disconnect the socket when the component unmounts
    return () => {
      socketIo.disconnect();
    };
  }, [setSocket]);
  useEffect(() => {
    const fetchUsers = async () => {
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();
      if (error) {
        console.log(error);
      } else {
        setUserss(users);
      }
    };
    fetchUsers();
  }, [setUserss]);

  const parsedData = JSON.parse(
    localStorage.getItem('sb-bqeerxqeupnwlcywxfml-auth-token') || ''
  );
  const name = parsedData.user.user_metadata.full_name;
  const truncatedName = name.length > 15 ? `${name.slice(0, 15)}...` : name;
  const nickName =
    parsedData.user.user_metadata.user_name ||
    parsedData.user.user_metadata.email;
  const profilePictureSrc = parsedData.user.user_metadata.avatar_url;
  const CurrentUserId = parsedData.user.user_metadata.email;
  console.log('current users id', CurrentUserId);
  console.log('avatar url ', profilePictureSrc);
  console.log('name is ', name);
  console.log('list of users from zustand state', userss);

  const { setSelectedUser } = UserDataStore();
  // const { message } = useMessageStore();
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    // Create a chat room ID
    const ids = [CurrentUserId, user.user_metadata.email].sort();
    console.log('ids', ids);
    const chatRoomIdd = `${ids[0]}-${ids[1]}`;
    // const chatRoomIdd = `${CurrentUserId}-${user.id}`;
    console.log('chatroom id is :', chatRoomIdd);
    setChatRoomId(chatRoomIdd);
    console.log('chat room id ', chatRoomIdd);
    console.log('chat room id from zustand', chatRoomId);
    // Send a message

    // socket && socket.emit('chat message', { chatRoomId, message: 'hello' });
    socket?.emit('join_room', chatRoomIdd);
  };

  return (
    <div className="h-[678px] w-[350px] rounded-xl border-[1px] border-solid border-darkslategray bg-white">
      <div className="flex flex-row pl-[30px] pt-[10px]">
        <img
          className="h-[50px] w-[50px] rounded-[50%] object-cover"
          alt=""
          src={profilePictureSrc}
        />
        <div className="pl-[10px]">
          <b className="   w-[180px] text-left text-[18px]">
            <p>{truncatedName}</p>
          </b>
          <p className=" w-[180px]  text-left text-[15px] font-extralight">
            {nickName}
          </p>
        </div>
        <div className="pt-[5px]">
          <Indicator className="  " color="red" size={8}>
            <Avatar className="" size="1.4rem" radius="sm" src={BellSvg} />
          </Indicator>
        </div>
      </div>

      <b className=" mb-[28px] ml-[30px] mt-[30px] flex text-2xl">Messages</b>
      <div className=" ml-[9px]  w-[330px]   pb-[12px]  ">
        <InputBar />
      </div>
      <div className=" h-[473px]">
        <ScrollArea
          style={{ height: '100%' }}
          scrollbarSize={8}
          scrollHideDelay={500}
        >
          {userss.map((user, index) => (
            <div
              key={user.id}
              className="relative "
              onMouseEnter={() => setHoveredMessageIndex(index)} // Set the hovered message index
              onMouseLeave={() => setHoveredMessageIndex(-1)} // Reset the hovered message index when leaving
              onClick={() => handleUserClick(user)}
            >
              {/* Dark green line */}
              {hoveredMessageIndex === index && (
                <div className="absolute left-0 h-full w-[5px] bg-darkgreen transition-colors duration-200"></div>
              )}

              <div className="w-[340px] pl-2 hover:bg-dimgreen">
                {/* Message box */}

                <Messagebox
                  avatarSrc={user.user_metadata.avatar_url || ''}
                  userName={
                    user.user_metadata.full_name &&
                    user.user_metadata.full_name.length > 15
                      ? `${user.user_metadata.full_name.slice(0, 15)}...`
                      : user.user_metadata.full_name || ''
                  }
                  messageText={user.user_metadata.email || ''}
                />
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Rectangle;
