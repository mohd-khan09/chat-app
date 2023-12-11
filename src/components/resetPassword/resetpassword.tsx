import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  Title,
} from '@mantine/core';
import supabase from '../SupabaseCleint/supabaseclient';
import { useForm } from '@mantine/form';
import { UseErrorStore } from '../../store';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import classes from '../../pages/ForgotPassword/ForgotPassword.module.css';
import Lottie from 'react-lottie-player';
import LockAnimation from '../../components/Animations/lock.json';
import Spinner from '../SVGs/spinner';
const ResetPassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { SetStoreError } = UseErrorStore();
  const [Loading, SetLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const { password } = form.values;

  const HandleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    SetLoading(true);
    const valid = form.validate();
    // console.log(valid);
    if (valid.hasErrors) {
      console.error('Form validation failed');
      SetLoading(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      console.error('Error signing up:', error);
      SetStoreError(error.message);
      enqueueSnackbar({
        message: error.message,
        variant: 'error',
        autoHideDuration: 3000,
      });
      // console.log('store error:', StoreError);
      SetLoading(false);
      return;
    }
    // console.log('user password updated', data);
    enqueueSnackbar({
      message: 'Password succesfully updated ',
      variant: 'success',
      autoHideDuration: 3000,
    });
    navigate('/');
    SetLoading(false);
  };

  return (
    <Container size={460} my={30}>
      <Paper withBorder shadow="md" p={20} radius="md" mt="md">
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <Text className="font-poppins  " c="dimmed" fz="sm" mt="xs">
          dont worry we will reset your password
        </Text>
        <Lottie
          loop
          animationData={LockAnimation}
          play
          style={{ width: 350, height: 100 }}
        />
        <form onSubmit={HandleSubmit}>
          <PasswordInput
            label="Password"
            defaultValue="secret"
            visible={visible}
            {...form.getInputProps('password')}
            onVisibilityChange={toggle}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            className="w-[350px]"
          />
          <PasswordInput
            label="Confirm password"
            defaultValue="secret"
            visible={visible}
            {...form.getInputProps('confirmPassword')}
            onVisibilityChange={toggle}
            onChange={(event) =>
              form.setFieldValue('confirmPassword', event.currentTarget.value)
            }
          />
          <div className="width-[20px] pt-4">
            <Button
              type="submit"
              className="rounded-xl bg-custom-teal text-black focus:outline-none  "
            >
              Reset password
              {Loading && (
                <div className="ml-2 ">
                  <Spinner />
                </div>
              )}
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
