import React from 'react';
import { Paper, Typography } from '@mui/material';

import { basicTheme } from '@/theme/theme';

interface IChatMessageProps {
  authorEmail: string;
  message: string;
}

const ChatMessage: React.FC<IChatMessageProps> = ({ authorEmail, message }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
        {authorEmail}
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          color: basicTheme.textColor,
          marginTop: 1,
          textAlign: 'justify',
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
};

export default ChatMessage;
