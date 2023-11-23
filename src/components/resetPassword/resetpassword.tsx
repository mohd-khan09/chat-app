import { useDisclosure } from '@mantine/hooks';
import { Button, PasswordInput, Stack } from '@mantine/core';
import supabase from '../SupabaseCleint/supabaseclient';
import { useForm } from '@mantine/form';
import UseErrorStore from '../../store';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
const ResetPassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { StoreError, SetStoreError } = UseErrorStore();
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
    // if (form.values.confirmPassword !== form.values.password) {
    //   console.error('consloe error :Password should be same');
    //   SetStoreError('Password do not match');
    //   enqueueSnackbar({
    //     message: StoreError,
    //     variant: 'error',
    //     autoHideDuration: 3000,
    //   });
    //   return;
    // }
    // if (password.length < 6) {
    //   console.error('consloe error :Password should be at least 6 characters');
    //   SetStoreError('Password should be at least 6 characters');
    //   enqueueSnackbar({
    //     message: StoreError,
    //     variant: 'error',
    //     autoHideDuration: 3000,
    //   });
    //   return;
    // }
    const valid = form.validate();
    console.log(valid);
    if (valid.hasErrors) {
      console.error('Form validation failed');
      return;
    }
    const { data, error } = await supabase.auth.updateUser({
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
      console.log('store error:', StoreError);
      return;
    }
    console.log('user password updated', data);
    enqueueSnackbar({
      message: 'Password succesfully updated ',
      variant: 'success',
      autoHideDuration: 3000,
    });
    navigate('/');
  };

  return (
    <Stack>
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
        <div className="pt-4 width-[20px]">
          <Button
            type="submit"
            className="text-black bg-teal-300 rounded-xl focus:outline-none  "
          >
            Reset password
          </Button>
        </div>
      </form>
    </Stack>
  );
};

export default ResetPassword;
