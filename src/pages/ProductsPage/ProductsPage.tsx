'use client';

import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import ProductCard from '@/pages/ProductsPage/components/ProductCard';
import GlobalSearch from '@/components/ElementsAndBlocks/GlobalSearch';
import AddProductBtn from '@/pages/ProductsPage/components/AddProductBtn';

import { useProductsStore } from '@/store/productsStore';

import { setQueryToUrl } from '@/helpers/locationHelpers';
import { qSKeys } from '@/constants/qSKeys';

const ProductsPage = () => {
  const {
    getAllProductsAction,
    getProductByIDAction,
    isLoading,
    error,
    products,
  } = useProductsStore();

  const [isOneRemovePopupOpened, setIsOneRemovePopupOpened] = useState(false);

  const isError = Boolean(!isLoading && error);
  const isShowNotEmptyList = Boolean(products.length && !isLoading && !error);
  const isShowEmptyList = Boolean(!products.length && !isLoading && !error);
  const [isNotFirstRender, setIsNotFirstRender] = useState(false);

  const searchAction = async (searchVal: string) => {
    setQueryToUrl(searchVal, qSKeys.productSearch);
    const productID = Number(searchVal);

    if (productID && isNotFirstRender) await getProductByIDAction(productID);
    else if (!productID && !isLoading && isNotFirstRender)
      await getAllProductsAction();
  };

  useEffect(() => {
    setIsNotFirstRender(true);
    getAllProductsAction();
  }, []);

  return (
    <Box data-testid='products-page'>
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
            placeholder='Enter product id'
            customStyle={{ maxWidth: 400, marginBottom: 7, marginTop: 3 }}
          />
        </Box>
        <AddProductBtn />
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
          products.map(
            ({
              productID,
              shelveID,
              productDimensions,
              productTitle,
              productDescription,
              productImgUrl,
            }) => (
              <ProductCard
                {...{
                  productID,
                  shelveID,
                  productDimensions,
                  productTitle,
                  productDescription,
                  productImgUrl,
                  isOneRemovePopupOpened,
                  setIsOneRemovePopupOpened,
                }}
                key={productID}
              />
            ),
          )}

        {isShowEmptyList && 'No products'}

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

export default ProductsPage;
