import { Box, Card, CardContent, Typography } from '@mui/material';

import { ICoordinates, IDimensions } from '@/types/sizeAndCoordinates';

interface IShelveCardProps {
  shelveID: number;
  shelveDimensions: IDimensions;
  coordinates: ICoordinates;
}

const ShelveCard: React.FC<IShelveCardProps> = ({
  shelveID,
  shelveDimensions,
  coordinates,
}) => {
  return (
    <Card key={shelveID}>
      <CardContent>
        <Typography component='h3' variant='h3'>
          Shelve id: {shelveID}
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Typography component='h4' variant='h4'>
            Coordinates:
          </Typography>
          <Typography component='p' variant='body1'>
            x: {coordinates.x}; y: {coordinates.y};
          </Typography>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Typography component='h4' variant='h4'>
            Shelve dimensions:
          </Typography>
          <Typography component='p' variant='body1'>
            width: {shelveDimensions.width};<br />
            length: {shelveDimensions.length};<br />
            height: {shelveDimensions.height};
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShelveCard;
