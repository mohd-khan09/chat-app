import MessageWithPhotoReciver from '../MessageWithPhoto/MessageWithPhoto';
import { ScrollArea } from '@mantine/core';
const MessageArea = () => {
  return (
    <div className=" w-full bg-slate-200 ">
      <ScrollArea style={{ height: 529 }} type="never">
        <MessageWithPhotoReciver />
      </ScrollArea>
    </div>
  );
};

export default MessageArea;
