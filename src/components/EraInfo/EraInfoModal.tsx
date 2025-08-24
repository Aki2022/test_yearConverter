import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { EraInfoModalProps } from './EraInfoModal.types';

export const EraInfoModal: React.FC<EraInfoModalProps> = ({
  isOpen,
  onClose,
  eraData
}) => {
  const formatPeriod = (startYear: number, endYear: number | null): string => {
    if (endYear === null) {
      return `${startYear}年 - 現在`;
    }
    const duration = endYear - startYear;
    return `${startYear}年 - ${endYear}年 (${duration}年間)`;
  };

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '80vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pb: 1
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {eraData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatPeriod(eraData.startYear, eraData.endYear)}
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="閉じる"
          sx={{ ml: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            概要
          </Typography>
          <Typography variant="body1" paragraph>
            {eraData.description}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            歴史的背景
          </Typography>
          <Typography variant="body1" paragraph>
            {eraData.historicalBackground}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: 120 }}
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};