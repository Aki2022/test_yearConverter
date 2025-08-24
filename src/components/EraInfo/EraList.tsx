import React from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  Box
} from '@mui/material';
import { EraListProps } from './EraInfoModal.types';
import { ERA_HISTORY_DATA } from '../../data/eraHistoryData';

export const EraList: React.FC<EraListProps> = ({ onEraClick }) => {
  const formatPeriodShort = (startYear: number, endYear: number | null): string => {
    if (endYear === null) {
      return `${startYear}-現在`;
    }
    return `${startYear}-${endYear}`;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
        年号一覧
      </Typography>
      
      <Paper sx={{ borderRadius: 2 }}>
        <List sx={{ p: 0 }}>
          {ERA_HISTORY_DATA.map((era, index) => (
            <ListItem key={era.name} disablePadding>
              <ListItemButton
                onClick={() => onEraClick(era)}
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: index < ERA_HISTORY_DATA.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                        {era.name}
                      </Typography>
                      <Chip
                        label={formatPeriodShort(era.startYear, era.endYear)}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};