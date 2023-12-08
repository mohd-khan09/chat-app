import { Avatar, Indicator, ScrollArea } from '@mantine/core';
import BellSvg from '../SVGs/bell.svg';
import InputBar from '../InputBar/InputBar';
import Messagebox from '../MesssageBox/Messagebox';
import { useEffect, useRef, useState } from 'react';
import Avatarr from 'react-avatar';
// import supabase from '../SupabaseCleint/supabaseclient';
import {
  ListOfAllUersStore,
  User,
  UserDataStore,
  useChatRoomIdStore,
  OnlineUsersStore,
  useSocketStore,
  useRoomUsersStore,
} from '../../store';
import supabase from '../SupabaseCleint/supabaseclient';
import io from 'socket.io-client';
interface RectangleBoxProps {
  name: string;
  nickName: string;
  profilePictureSrc: string;
}
// type UnreadMessagesCount = Record<string, number>;
const Rectangle: React.FC<RectangleBoxProps> = () => {
  // const [hoveredMessageIndex, setHoveredMessageIndex] = useState(-1);
  // const [unreadMessages, setUnreadMessages] = useState(0);
  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
  const { userss, setUserss } = ListOfAllUersStore();
  const { socket, setSocket } = useSocketStore();
  const { chatRoomId, setChatRoomId } = useChatRoomIdStore();
  const { onlineUsers, setOnlineUsers } = OnlineUsersStore();
  const { selectedUser, setSelectedUser } = UserDataStore();
  const { usersInRoom, setUsersInRoom } = useRoomUsersStore();
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<{ sender: string }[]>(
    []
  );
  // const [unreadMessagesCount, setUnreadMessagesCount] =
  //   useState<UnreadMessagesCount>({});
  // const {unreadMessages, setUnreadMessagesCount } = useUnreadMessagesCountStore();

  const parsedData = JSON.parse(
    localStorage.getItem('sb-bqeerxqeupnwlcywxfml-auth-token') || ''
  );
  const CurrentUserEmail =
    parsedData.user.user_metadata.email || parsedData.user.email;
  useEffect(() => {
    const socketIo = io('http://localhost:3001');
    socketIo.emit('user_online', { username: CurrentUserEmail });
    console.log('user name enmitted to backend');
    setSocket(socketIo);

    // Disconnect the socket when the component unmounts
    return () => {
      socketIo.disconnect();
    };
  }, [CurrentUserEmail, setSocket]);
  interface MessageData {
    sender: string;
    receiver: string;
    // include other properties of messageData here
  }
  //////////////////

  useEffect(() => {
    const fetchUnreadMessagesFromSupabase = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('read', false)
        .eq('receiver', CurrentUserEmail);

      if (error) {
        console.error('Error fetching unread messages:', error);
        return;
      }
      console.log('fetchUnreadMessagesFromSupabase', data);
      setUnreadMessages(data);
      setHasUnreadMessages(data.length > 0);
      return data.length;
    };

    socket?.on('recive_message_all', (messageData: MessageData) => {
      console.log('Received message data:', messageData);
      // Check if the message was sent to you
      if (messageData.receiver === CurrentUserEmail) {
        console.log(
          'Message was sent to current user, fetching unread messages...'
        );
        // setUnreadMessagesCount((prevCount) => ({
        //   ...prevCount,
        //   [messageData.sender]: (prevCount[messageData.sender] || 0) + 1,
        // }));
        setTimeout(fetchUnreadMessagesFromSupabase, 1000);
      }
    });

    return () => {
      socket?.off('recive_message');
    };
  }, [CurrentUserEmail, socket]);
  /////////////
  useEffect(() => {
    const fetchUnreadMessagesFromSupabase = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('read', false)
        .eq('receiver', CurrentUserEmail);

      if (error) {
        console.error('Error fetching unread messages:', error);
        return;
      }
      console.log('fetchUnreadMessagesFromSupabase', data);
      setHasUnreadMessages(data.length > 0);
      setUnreadMessages(data);
      return data.length;
    };

    fetchUnreadMessagesFromSupabase();
  }, [CurrentUserEmail]);

  const markMessagesAsRead = async (
    currentUserEmail: string,
    senderEmail: string
  ) => {
    const { data, error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('receiver', currentUserEmail)
      .eq('sender', senderEmail);

    if (error) {
      console.error('Error updating messages:', error);
      return;
    }

    console.log('Updated messages:', data);
  };
  ////////////////
  const socketRef = useRef(socket);
  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);
  useEffect(() => {
    const fetchUsers = async () => {
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();
      if (error) {
        console.log(error);
      } else {
        setUserss(
          users.map((user) => ({
            ...user,
            email: user.email || '',
          }))
        );
      }
    };
    fetchUsers();
  }, [setUserss]);
  useEffect(() => {
    socketRef.current?.on('update_user_list', (onlineUsers) => {
      // console.log(onlineUsers, 'list of online users');
      // Update your state here
      setOnlineUsers(onlineUsers);
    });
  }, [setOnlineUsers, socket]);
  //users in th room
  console.log('users in the room', usersInRoom);

  const name =
    parsedData.user.user_metadata.full_name ||
    parsedData.user.email.split('@')[0];
  const truncatedName = name.length > 15 ? `${name.slice(0, 15)}...` : name;
  const nickName =
    parsedData.user.user_metadata.user_name ||
    parsedData.user.user_metadata.email ||
    parsedData.user.email;
  const profilePictureSrc = parsedData.user.user_metadata.avatar_url;
  const CurrentUserId =
    parsedData.user.user_metadata.email || parsedData.user.email;
  console.log('current users id', CurrentUserId);
  console.log('avatar url ', profilePictureSrc);
  console.log('name is ', name);
  console.log('list of users from zustand state', userss);
  console.log('list of online users  ', onlineUsers);

  // const { message } = useMessageStore();
  const handleUserClick = async (user: User, index: number) => {
    if (chatRoomId) {
      socket?.emit('leave_room', chatRoomId);
    }
    setSelectedUser(user);
    setSelectedUserIndex(index);
    const handleUsersInRoom = ({
      roomId,
      usernames,
    }: {
      roomId: string;
      usernames: string[];
    }) => {
      // Update the state with the list of users in the room
      setUsersInRoom(roomId, usernames);
      console.log('Updated users in room:', roomId, usernames);
    };

    // Create a chat room ID
    const ids = [CurrentUserId, user.user_metadata.email || user.email].sort();
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
    socket?.on('users_in_room', handleUsersInRoom);
    setSelectedUser(user);
    await markMessagesAsRead(CurrentUserEmail, user.email);
    const fetchUnreadMessagesFromSupabase = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('read', false)
        .eq('receiver', CurrentUserEmail);

      if (error) {
        console.error('Error fetching unread messages:', error);
        return;
      }
      console.log('fetchUnreadMessagesFromSupabase', data);
      setUnreadMessages(data);
      setHasUnreadMessages(data.length > 0);
      return data.length;
    };

    setTimeout(fetchUnreadMessagesFromSupabase, 1000);
    console.log('unreadMessages', unreadMessages);
  };
  useEffect(() => {
    console.log('unreadMessages updated', unreadMessages);
  }, [unreadMessages]);
  return (
    <div className="h-[678px] w-[350px] rounded-xl border-[1px] border-solid border-darkslategray bg-white">
      <div className="flex flex-row pl-[30px] pt-[10px]">
        {profilePictureSrc ? (
          <img
            className="h-[50px] w-[50px] rounded-[50%] object-cover"
            alt=""
            src={profilePictureSrc}
          />
        ) : (
          <Avatarr
            name={parsedData.user.email.split('@')[0]}
            size="60"
            round={true}
          />
        )}

        <div className="pl-[10px]">
          <b className="   w-[180px] text-left text-[18px]">
            <p>{truncatedName}</p>
          </b>
          <p className=" w-[180px]  text-left text-[15px] font-extralight">
            {nickName}
          </p>
        </div>
        <div className="pt-[5px]">
          <Indicator
            color="red"
            size={10}
            processing
            disabled={!hasUnreadMessages}
          >
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
              // onMouseEnter={() => setHoveredMessageIndex(index)} // Set the hovered message index
              // onMouseLeave={() => setHoveredMessageIndex(-1)} // Reset the hovered message index when leaving
              onClick={() => handleUserClick(user, index)}
            >
              <div
                style={{
                  paddingLeft: '45px',
                  // paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                }}
              >
                {unreadMessages.some(
                  (message: { sender: string }) => message.sender === user.email
                ) && (
                  <Indicator
                    color="red"
                    offset={18}
                    size={15}
                    inline
                    label="New"
                  />
                )}
              </div>
              {/* Dark green line */}
              {selectedUserIndex === index && (
                <div className="absolute left-0 h-full w-[5px] bg-darkgreen transition-colors duration-200"></div>
              )}

              <div
                className={`w-[340px] pl-2 hover:bg-scrollGreen ${
                  selectedUserIndex === index ? 'bg-dimgreen' : ''
                }`}
              >
                {/* Message box */}
                <Messagebox
                  avatarSrc={user.user_metadata.avatar_url || ''}
                  userName={
                    user.user_metadata.full_name &&
                    user.user_metadata.full_name.length > 15
                      ? `${user.user_metadata.full_name.slice(0, 15)}...`
                      : user.user_metadata.full_name || user.email.split('@')[0]
                  }
                  messageText={user.user_metadata.email || user.email}
                />

                {onlineUsers.includes(
                  user.user_metadata.email || user.email
                ) && (
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: 'green',
                      position: 'absolute',
                      right: '30px',
                      top: '28px',
                    }}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Rectangle;
