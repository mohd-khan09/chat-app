import MessageWithPhotoReciver from '../MessageWithPhoto/MessageWithPhoto';
import { ScrollArea } from '@mantine/core';

const MessageArea: React.FC = () => {
  return (
    <div className="w-full ">
      <ScrollArea style={{ height: 529 }} type="never">
        <div className="flex justify-center">
          <div style={{ width: '100%' }}></div>
        </div>
        <MessageWithPhotoReciver />
      </ScrollArea>
    </div>
  );
};

export default MessageArea;
