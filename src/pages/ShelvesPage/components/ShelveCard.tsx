import { Box, Card, CardContent, Typography } from '@mui/material';

import { ICoordinates, IDimensions } from '@/types/sizeAndCoordinates';
import { basicTheme } from '@/theme/theme';

interface IShelveCardProps {
  shelveID: number;
  shelveDimensions: IDimensions;
  coordinates: ICoordinates;
  percentBusyVolume: number;
}

const ShelveCard: React.FC<IShelveCardProps> = ({
  shelveID,
  shelveDimensions,
  coordinates,
  percentBusyVolume,
}) => {
  const percentEmptyVolume = 100 - percentBusyVolume;

  return (
    <Card key={shelveID}>
      <CardContent
        sx={{
          background: `linear-gradient(transparent ${percentEmptyVolume}%, ${basicTheme.success} ${percentEmptyVolume}%)`,
        }}
      >
        <Typography component='h3' variant='h3'>
          Shelve id: {shelveID}
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Typography component='h4' variant='h4'>
            Coordinates:
          </Typography>
          <Typography component='p' variant='body1'>
            x: {coordinates?.x}; y: {coordinates?.y};
          </Typography>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Typography component='h4' variant='h4'>
            Shelve dimensions:
          </Typography>
          <Typography component='p' variant='body1'>
            width: {shelveDimensions?.width} sm;
            <br />
            length: {shelveDimensions?.length} sm;
            <br />
            height: {shelveDimensions?.height} sm;
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShelveCard;
