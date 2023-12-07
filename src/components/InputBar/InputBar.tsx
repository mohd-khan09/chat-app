import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const InputBar = () => {
  return (
    <div>
      <TextInput
        size="md"
        variant="filled"
        radius="lg"
        placeholder="Search chats"
        className="focus:outline-none"
        leftSection={<IconSearch size={18} strokeWidth={1.5} />}
      />
    </div>
  );
};

export default InputBar;
