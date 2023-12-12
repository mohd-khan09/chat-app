import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';

import { GoogleButton } from '../SVGs/GoogleIcon';
import { GithubButton } from '../SVGs/GithubIcon';
import supabase from '../SupabaseCleint/supabaseclient';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseErrorStore } from '../../store';
import Spinner from '../SVGs/spinner';
import { useSnackbar } from 'notistack';

export function AuthenticationForm(props: PaperProps) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { StoreError, SetStoreError } = UseErrorStore();
  const [Loading, SetLoading] = useState(false);
  const [type, toggle] = useToggle(['login', 'register']);
  // wherever you call toggle, reset the form
  const handleToggle = () => {
    toggle();
    form.reset();
  };
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) =>
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/.test(val)
          ? null
          : 'Invalid email adress',
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  const { email, password } = form.values;
  const signInUser = async () => {
    const valid = form.validate();
    console.log(valid);
    if (valid.hasErrors) {
      console.error('Form validation failed');
      return;
    }
    SetLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
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
      console.log(StoreError);
      SetLoading(false);
      return;
    }
    console.log('User data:from login', data);
    navigate('/home');
    SetLoading(false);
  };

  const SignUpUser = async () => {
    SetLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'http://localhost:5173/home',
      },
    });
    if (error) {
      console.error('Error signing up:', error);
      SetStoreError(error.message);
      enqueueSnackbar({
        message: error.message,
        variant: 'error',
        autoHideDuration: 3000,
      });
      console.log(StoreError);
      SetLoading(false);
      return;
    }
    console.log('User data:from register', data);
    SetLoading(false);
    enqueueSnackbar({
      message: 'email sent succesfully for confirmation',
      variant: 'success',
      autoHideDuration: 3000,
    });
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (type === 'register') {
      SignUpUser();
    } else {
      signInUser();
    }
  };

  const SocialLoginGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/home',
      },
    });
    if (error) {
      console.error('Error signing up:', error);
      SetStoreError(error.message);
      enqueueSnackbar({
        message: error.message,
        variant: 'error',
        autoHideDuration: 3000,
      });
      console.log(StoreError);
      return;
    } else {
      console.log('User data:from register', data);
    }
  };
  const SocialLoginGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:5173/home',
      },
    });
    if (error) {
      console.error('Error signing up:', error);
      SetStoreError(error.message);
      enqueueSnackbar({
        message: error.message,
        variant: 'error',
        autoHideDuration: 3000,
      });
      console.log(StoreError);
      return;
    } else {
      console.log('User data:from register', data);
    }
  };
  const handleSocialLoginGoogle = () => {
    SocialLoginGoogle();
  };
  const handleSocialLoginGithub = () => {
    SocialLoginGithub();
  };

  return (
    <>
      <Paper
        className="w-[440px]"
        shadow="md"
        radius="md"
        p="xl"
        withBorder
        {...props}
      >
        <Text size="lg" fw={500}>
          Welcome to Mantine, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton onClick={handleSocialLoginGoogle} radius="xl">
            Google
          </GoogleButton>
          <GithubButton onClick={handleSocialLoginGithub} radius="xl">
            Twitter
          </GithubButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={handleSubmit}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                radius="md"
              />
            )}
            <div className="text-left ">
              <div className="p-2">
                <TextInput
                  required
                  label="email"
                  placeholder="enter your email adress"
                  {...form.getInputProps('email')}
                  onChange={(event) =>
                    form.setFieldValue('email', event.currentTarget.value)
                  }
                  radius="md"
                />
              </div>
              <div className="p-2">
                <TextInput
                  required
                  label="Password"
                  placeholder="Your password"
                  {...form.getInputProps('password')}
                  onChange={(event) =>
                    form.setFieldValue('password', event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    'Password should include at least 6 characters'
                  }
                  radius="md"
                />
                <div className="mt-2 pl-2">
                  {type === 'login' && (
                    <Anchor
                      component="button"
                      type="button"
                      c="dimmed"
                      className="  
                  focus:outline-none"
                      size="xs"
                      onClick={() => navigate('/forgot-password')}
                    >
                      forgot password ??
                    </Anchor>
                  )}
                </div>
              </div>
            </div>

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={handleToggle}
              size="xs"
              className="  
                  focus:outline-none"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              type="submit"
              className="bg-custom-teal text-black focus:outline-none"
              radius="xl"
            >
              {upperFirst(type)}
              {Loading && (
                <div className="ml-2 ">
                  <Spinner />
                </div>
              )}
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}
