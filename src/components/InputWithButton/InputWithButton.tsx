import { TextInput, TextInputProps, ActionIcon, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import SendButtonChat from '../SVGs/SendButtonChat';
// import EmojiPicker from 'emoji-picker-react';

export function InputWithButton(props: TextInputProps) {
  // const HandleClick = () => {
  //   return (
  //     <div>
  //       <EmojiPicker />
  //     </div>
  //   );
  // };
  return (
    <div className=" w-full ">
      <TextInput
        radius="md"
        size="xl"
        placeholder="Type a message"
        rightSectionWidth={42}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon className="pr-[34px] focus:outline-none">
            <SendButtonChat />
          </ActionIcon>
        }
        {...props}
      />
    </div>
  );
}
