import { create } from 'zustand';
import { Socket } from 'socket.io-client';
export interface User {
  id: string;
  email: string;
  user_metadata: {
    avatar_url?: string;
    email?: string;
    full_name?: string;
    name?: string;
    picture?: string;
    user_name?: string;
  };
}
interface UserStore {
  userss: User[];
  setUserss: (users: User[]) => void;
}
//**interface for the list of all users */
interface ErrorState {
  StoreError: string | null;
  SetStoreError: (error: string) => void;
}
// export interface Message {
//   text: string;
//   // Other message properties can be added here
// }
interface MessageStore {
  message: string | null;
  setMessage: (message: string) => void;
}
interface SocketStore {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}
interface Store {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}
interface ChatRoomIdStore {
  chatRoomId: string;
  setChatRoomId: (roomId: string) => void;
}
interface TypingStore {
  isTyping: boolean; // Assuming isTyping is a boolean
  setTypingStatus: (isTyping: boolean) => void; // Setter function
}
export interface Message {
  room: string;
  Author: string;
  message: string;
  time: string;
}
interface messageStore {
  messageList: Message[]; // Adjust the type as per your message structure
  setMessageToList: (message: Message) => void;
  resetMessageList: () => void;
}

// interface OnlineUserStore {
//   userNames: string[];
//   addUser: (userName: string) => void;
//   removeUser: (userName: string) => void;
//   users: User[];
//   addUser: (user: User) => void;
// }
interface OnlineUserStore {
  onlineUsers: string[];
  setOnlineUsers: (users: string[]) => void;
}

export const OnlineUsersStore = create<OnlineUserStore>((set) => ({
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
}));

export const UseErrorStore = create<ErrorState>((set) => ({
  StoreError: null,
  SetStoreError: (error: string) =>
    set((state) => ({ ...state, StoreError: error })),
}));

export const UserDataStore = create<Store>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set((state) => ({ ...state, selectedUser: user })),
}));

export const ListOfAllUersStore = create<UserStore>((set) => ({
  userss: [],
  setUserss: (users) => set((state) => ({ ...state, userss: users })),
}));

export const useMessageStore = create<MessageStore>((set) => ({
  message: null,
  setMessage: (message) => set({ message }),
}));
export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}));
//  setSocket: (socket: Socket) => set({ socket }),
export const useChatRoomIdStore = create<ChatRoomIdStore>((set) => ({
  chatRoomId: '',
  setChatRoomId: (roomId) => {
    set({ chatRoomId: roomId });
  },
}));

export const MessageListStore = create<messageStore>((set) => ({
  messageList: [],
  setMessageToList: (message: Message) =>
    set((state) => ({
      ...state,
      messageList: [...state.messageList, message],
    })),
  resetMessageList: () => set({ messageList: [] }),
}));
export const useTypingStore = create<TypingStore>((set) => ({
  isTyping: false,
  setTypingStatus: (isTyping) => set({ isTyping }),
}));
