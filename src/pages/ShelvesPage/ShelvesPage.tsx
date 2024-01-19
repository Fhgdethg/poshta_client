'use client';

import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import ShelveCard from '@/pages/ShelvesPage/components/ShelveCard';
import GlobalSearch from '@/components/ElementsAndBlocks/GlobalSearch';
import AddShelveBtn from '@/pages/ShelvesPage/components/AddShelveBtn';

import { useAuthStore } from '@/store/authStore';
import { useShelvesStore } from '@/store/shelvesStore';

import { setQueryToUrl } from '@/helpers/locationHelpers';

import { qSKeys } from '@/constants/qSKeys';

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
  const [isNotFirstRender, setIsNotFirstRender] = useState(false);

  const searchAction = (searchVal: string) => {
    setQueryToUrl(searchVal, qSKeys.shelveSearch);
    const shelveID = Number(searchVal);

    if (shelveID && isNotFirstRender) getShelveByIDAction(shelveID);
    else if (!shelveID && !isLoading && isNotFirstRender) getAllShelvesAction();
  };

  useEffect(() => {
    setIsNotFirstRender(true);
    getAllShelvesAction();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media screen and (max-width: 900px)': {
            flexDirection: 'column',
          },
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
          '@media screen and (max-width: 1475px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
          },
          '@media screen and (max-width: 1185px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
          '@media screen and (max-width: 970px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media screen and (max-width: 550px)': {
            gridTemplateColumns: '1fr',
          },
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
