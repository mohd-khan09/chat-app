import MessageWithPhotoReciver from '../MessageWithPhoto/MessageWithPhoto';
import { ScrollArea } from '@mantine/core';
import Lottie from 'react-lottie-player';
import chatSkleton from '../loaders/messageLoader.json';

const MessageArea: React.FC = () => {
  return (
    <div className="w-full ">
      <ScrollArea style={{ height: 529 }} type="never">
        <div className="flex justify-center">
          <div style={{ width: '100%' }}>
            {/* <Lottie
              loop
              animationData={chatSkleton}
              play
              style={{ width: '100%', height: 'auto' }}
            /> */}
          </div>
        </div>
        <MessageWithPhotoReciver />
      </ScrollArea>
    </div>
  );
};

export default MessageArea;
