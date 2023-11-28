import { TextInput, TextInputProps, ActionIcon, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import SendButtonChat from '../SVGs/SendButtonChat';

export function InputWithButton(props: TextInputProps) {
  return (
    <div className=" w-[1100px] ">
      <TextInput
        radius="md"
        size="xl"
        placeholder="Search questions"
        rightSectionWidth={42}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon className="focus:outline-none">
            <SendButtonChat />
          </ActionIcon>
        }
        {...props}
      />
    </div>
  );
}
