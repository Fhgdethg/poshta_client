'use client';

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Box, CircularProgress } from '@mui/material';

import SmallPaperForm from '@/components/ElementsAndBlocks/SmallPaperForm';
import ChatMessage from '@/pages/ChatPage/components/ChatMessage';

import { useAuthStore } from '@/store/authStore';

import { getRandomId } from '@/helpers/mainHelpers';

import { chatSocketQKeys } from '@/queries/chatSocket/chatSocketQKeys';

import { IMessage } from '@/types/message';

const ChatPage = () => {
  const { user } = useAuthStore();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const chatAPI = io(`${process.env.SERVER_URL}`, {
      withCredentials: true,
    });

    setSocket(chatAPI);

    chatAPI.on(chatSocketQKeys.getAllMessages, (messages: IMessage[]) => {
      setMessages(messages);
      setIsLoading(false);
    });

    chatAPI.on(chatSocketQKeys.chatMsg, (msg: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      chatAPI.close();
    };
  }, []);

  const sendMessage = () => {
    const fixedMessage = message.trim();

    if (socket && fixedMessage && user) {
      console.log(user.email);
      socket.emit(chatSocketQKeys.chatMsg, {
        authorEmail: user.email,
        message: fixedMessage,
      });
      setMessage('');
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxHeight: 'calc(100vh - 250px)',
          overflow: 'auto',
        }}
      >
        {Boolean(messages?.length && !isLoading) &&
          messages.map((msgData, index) => (
            <ChatMessage
              key={getRandomId()}
              authorEmail={msgData.authorEmail}
              message={msgData.message}
            />
          ))}
        {Boolean(!messages?.length && !isLoading) && 'No messages'}
      </Box>
      <SmallPaperForm
        val={message}
        setVal={setMessage}
        submitAction={sendMessage}
        areaPlaceholder='Enter message'
        btnText='SEND'
        styles={{
          position: 'absolute',
          bottom: 30,
          left: '40px',
        }}
      />
      {isLoading && (
        <CircularProgress
          color='secondary'
          sx={{
            marginLeft: 1,
            position: 'absolute',
            left: 'calc(50vw - 22px)',
          }}
          size={44}
        />
      )}
    </Box>
  );
};

export default ChatPage;
