import { Box, Typography, Card, CardContent } from '@mui/material';

import LoginForm from '@/pages/LoginPage/components/LoginForm';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Card
        elevation={3}
        sx={{
          minWidth: 600,
          minHeight: 420,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardContent sx={{ padding: 4, width: '100%' }}>
          <Typography
            variant='h1'
            component='h1'
            sx={{ textAlign: 'center', marginBottom: 3 }}
          >
            Login
          </Typography>
          <LoginForm />
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
