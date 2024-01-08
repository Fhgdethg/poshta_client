'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import GlobalInput from '@/components/ElementsAndBlocks/GlobalInput';

import useDebounce from '@/hooks/useDebounce';

import { IStyleProp } from '@/types/styleProp';

interface IGlobalSearchProps {
  placeholder?: string;
  customStyle?: IStyleProp;
  searchAction: (searchVal: string) => void;
}

const GlobalSearch: React.FC<IGlobalSearchProps> = ({
  placeholder = '',
  customStyle = {},
  searchAction,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const debouncedValue = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    searchAction(searchValue);
  }, [debouncedValue]);

  return (
    <Box sx={{ position: 'relative' }}>
      <SearchIcon sx={{ position: 'absolute', top: 7 }} />
      <GlobalInput
        {...{
          value: searchValue,
          onChange: searchHandler,
          type: 'number',
          placeholder,
          customStyle: {
            input: {
              paddingLeft: 4,
            },
            ...customStyle,
          },
        }}
      />
    </Box>
  );
};

export default GlobalSearch;
