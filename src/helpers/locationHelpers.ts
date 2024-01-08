import queryString from 'query-string';
import appHistory from '@/constants/history';

export const getQueryByNameFromUrl = (queryName: string) => {
  const searchQuery = queryString.parse(location.search);
  if (searchQuery?.[queryName]) {
    return searchQuery[queryName]?.toString();
  }
  return undefined;
};

export const setQueryToUrl = (query: string | number, key: string) => {
  const _query = query.toString();

  const locationSearchData = queryString.parse(location.search);
  locationSearchData[key] = _query;

  const newLocationSearchString = queryString.stringify(locationSearchData);
  appHistory.push(`${location.pathname}?${newLocationSearchString}`);
};

export const removeQueryFromUrl = (key: string) => {
  const locationSearchData = queryString.parse(location.search);
  delete locationSearchData[key];

  if (Object.keys(locationSearchData).length === 0) {
    return appHistory.push(`${location.pathname}`);
  }

  const newLocationSearchString = queryString.stringify(locationSearchData);
  appHistory.push(`${location.pathname}?${newLocationSearchString}`);
};

export const setMultiQueriesToUrl = (queries: { [key: string]: any }) => {
  const locationSearchData = queryString.parse(location.search);
  const filteredQueries: { [key: string]: string } = {};

  Object.entries(queries).forEach(([key, value]) => {
    if (value) filteredQueries[key] = value;
    if (!value) delete locationSearchData[key]; // TODO: check this
  });

  const newLocationSearchString = queryString.stringify({
    ...locationSearchData,
    ...filteredQueries,
  });

  appHistory.push(`${location.pathname}?${newLocationSearchString}`);
};

export const removeMultiQueriesFromUrl = (queries: string[]) => {
  const locationSearchData = queryString.parse(location.search);

  queries.forEach((key) => {
    delete locationSearchData[key];
  });

  if (Object.keys(locationSearchData).length === 0) {
    return appHistory.push(`${location.pathname}`);
  }

  const newLocationSearchString = queryString.stringify(locationSearchData);
  appHistory.push(`${location.pathname}?${newLocationSearchString}`);
};
