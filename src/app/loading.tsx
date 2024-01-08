import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <CircularProgress color='secondary' sx={{ marginLeft: 1 }} size={45} />
    </Box>
  );
};

export default Loading;
