'use client';

import { Alert, Box, Button, CircularProgress } from '@mui/material';
import {
  SubmitHandler,
  useForm,
  Controller,
  useFormState,
} from 'react-hook-form';
import { useRouter } from 'next/navigation';

import GlobalInput from '@/components/ElementsAndBlocks/GlobalInput';

import { useAuthStore } from '@/store/authStore';

import { routes } from '@/constants/routes';

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { push } = useRouter();
  const { loginAction, user, isLoading, error } = useAuthStore();
  const { handleSubmit, control } = useForm<ILoginForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    await loginAction(data);
    setTimeout(() => {
      push(routes.root);
    }, 10);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='email'
        rules={emailRules}
        render={({ field: { onChange, value } }) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='Email'
            placeholder='emaple.example@example.com'
            customStyle={{ marginBottom: 3 }}
            helperText={errors?.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        rules={passwordRules}
        render={({ field: { onChange, value } }) => (
          <GlobalInput
            value={value}
            onChange={onChange}
            required
            label='Password'
            id='outlined-password-input'
            type='password'
            customStyle={{ marginBottom: 5 }}
            helperText={errors?.password?.message}
          />
        )}
      />

      {!isLoading && error && (
        <Alert severity='error' sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' size='large' type='submit'>
          Submit
          {isLoading && (
            <CircularProgress
              color='secondary'
              sx={{ marginLeft: 1 }}
              size={25}
            />
          )}
        </Button>
      </Box>
    </form>
  );
};

const emailRules = {
  required: {
    value: true,
    message: 'This field is required',
  },
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Data is not correct',
  },
};

const passwordRules = {
  required: {
    value: true,
    message: 'This field is required',
  },
  minLength: {
    value: 6,
    message: 'Password must be longer, that 6 chars',
  },
};

export default LoginForm;
