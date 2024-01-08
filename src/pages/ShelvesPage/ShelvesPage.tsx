'use client';

import { useEffect } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import ShelveCard from '@/pages/ShelvesPage/components/ShelveCard';
import GlobalSearch from '@/components/ElementsAndBlocks/GlobalSearch';
import AddShelveBtn from '@/pages/ShelvesPage/components/AddShelveBtn';

import { useAuthStore } from '@/store/authStore';
import { useShelvesStore } from '@/store/shelvesStore';

const ShelvesPage = () => {
  const {
    getAllShelvesAction,
    getShelveByIDAction,
    isLoading,
    error,
    shelves,
  } = useShelvesStore();

  const { user } = useAuthStore();

  const isError = Boolean(!isLoading && error);
  const isShowNotEmptyList = Boolean(shelves.length && !isLoading && !error);
  const isShowEmptyList = Boolean(!shelves.length && !isLoading && !error);

  const searchAction = (searchVal: string) => {
    const shelveID = Number(searchVal);

    if (shelveID) getShelveByIDAction(shelveID);
    else if (!shelveID && !isLoading) getAllShelvesAction();
  };

  useEffect(() => {
    getAllShelvesAction();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <GlobalSearch
            searchAction={searchAction}
            placeholder='Enter shelve id'
            customStyle={{ maxWidth: 400, marginBottom: 7, marginTop: 3 }}
          />
        </Box>
        {Boolean(user && user?.role === 'admin') && <AddShelveBtn />}
      </Box>
      {isError && <Alert severity='error'>{error}</Alert>}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridGap: 30,
        }}
      >
        {isShowNotEmptyList &&
          shelves.map(({ shelveID, shelveDimensions, coordinates }) => (
            <ShelveCard
              {...{ shelveID, shelveDimensions, coordinates }}
              key={shelveID}
            />
          ))}

        {isShowEmptyList && 'No shelves'}

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
    </Box>
  );
};

export default ShelvesPage;
