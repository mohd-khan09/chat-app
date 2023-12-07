import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './ForgotPassword.module.css';
import supabase from '../../components/SupabaseCleint/supabaseclient';
import { UseErrorStore } from '../../store';
import { useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import MailAnimation from '../../components/Animations/mail.json';
import Lottie from 'react-lottie-player';
import Spinner from '../../components/SVGs/spinner';
const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [Loading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const { StoreError, SetStoreError } = UseErrorStore();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (val) =>
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/.test(val)
          ? null
          : 'Invalid email adress',
    },
  });
  const { email } = form.values;
  const HandleSubmit = async (event: FormEvent) => {
    SetLoading(true);
    event.preventDefault();
    const valid = form.validate();
    console.log(valid);
    if (valid.hasErrors) {
      console.error('Form validation failed');
      SetLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password',
    });

    if (error) {
      console.error('Error signing up:', error);
      SetStoreError(error.message);
      enqueueSnackbar({
        message: error.message,
        variant: 'error',
        autoHideDuration: 3000,
      });
      console.log('this is store error', StoreError);
      SetLoading(false);
      return;
    }
    console.log('mail sent to reset password', data);
    enqueueSnackbar({
      message: 'email sent succesfully',
      variant: 'success',
      autoHideDuration: 3000,
    });
    SetLoading(false);
  };

  return (
    <Container size={460} my={30}>
      <form onSubmit={HandleSubmit}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="md">
          <Title className={classes.title} ta="center">
            Forgot your password?
          </Title>
          <Text className="font-poppins  " c="dimmed" fz="sm">
            Enter your email to get a reset link
          </Text>
          <div>
            <Lottie
              loop
              animationData={MailAnimation}
              play
              style={{ width: 350, height: 100 }}
            />
          </div>
          <TextInput
            label="Your email adress"
            placeholder="me@mantine.dev"
            {...form.getInputProps('email')}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            required
            radius="md"
            style={{ textAlign: 'left' }}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                {/* <Box onClick={() => navigate('/')} ml={5}>
                  Back to the login page
                </Box> */}
                <Anchor
                  component="button"
                  type="button"
                  c="dimmed"
                  size="xs"
                  className="  
                  focus:outline-none"
                  onClick={() => navigate('/')}
                >
                  Back to the login page
                </Anchor>
              </Center>
            </Anchor>
            <Button
              type="submit"
              className="rounded-xl bg-custom-teal text-black focus:outline-none"
            >
              Reset password
              {Loading && (
                <div className="ml-2 ">
                  <Spinner />
                </div>
              )}
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
};

export default ForgotPassword;
