import React from 'react';
import MessageWithPhotoReciver from '../MessageWithPhoto/MessageWithPhoto';
import { ScrollArea } from '@mantine/core';
const MessageArea = () => {
  return (
    <div className="h-[529px] w-[1100px] bg-slate-200 ">
      <ScrollArea style={{ height: 529 }} type="never">
        <MessageWithPhotoReciver />
      </ScrollArea>
    </div>
  );
};

export default MessageArea;
