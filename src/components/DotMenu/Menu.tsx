import { Menu, Button, Text, rem } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import { useState } from 'react';
import ThreeDots from '../SVGs/three-dots-vertical';
import supabase from '../SupabaseCleint/supabaseclient';
import { useNavigate } from 'react-router-dom';
const DotMenu = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const handleToggle = () => {
    setOpened(!opened); // Toggle the state when the button is clicked
  };
  const HandleClick = async () => {
    const { error } = await supabase.auth.signOut();

    // console.log('signoutcalled');
    if (error) {
      // console.log(error);
    } else {
      navigate('/home');
      // console.log('navigate called');
    }
  };
  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      shadow="md"
      width={200}
      position="bottom-end"
    >
      <Menu.Target>
        <Button className="focus:outline-none" onClick={handleToggle}>
          <ThreeDots />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          View Contact
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessageCircle style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Mute notifications
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconPhoto style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Media,Links and docs
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSearch style={{ width: rem(14), height: rem(14) }} />
          }
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={
            <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          onClick={HandleClick}
          color="red"
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default DotMenu;
