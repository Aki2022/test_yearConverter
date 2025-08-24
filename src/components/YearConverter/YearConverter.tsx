import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  Snackbar,
  Fade,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Clear as ClearIcon,
  ContentCopy as ContentCopyIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { YearConverterProps, ConversionResult } from './YearConverter.types';
import { convertWesternToEra } from '../../utils/eraCalculation';

const ResultPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  // タッチフレンドリーな最小サイズ
  minHeight: '48px',
  
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: theme.shadows[8],
  },
  
  // タッチデバイス用の調整
  '@media (hover: none)': {
    '&:active': {
      transform: 'scale(0.98)',
      backgroundColor: theme.palette.action.selected,
    },
  },
  
  // リップル効果
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${theme.palette.primary.main}20 1px, transparent 1px)`,
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.4s, height 0.4s',
    pointerEvents: 'none',
    zIndex: 0,
  },
  
  '&:active::before': {
    width: '200px',
    height: '200px',
  },
  
  // 子要素をリップル効果の上に表示
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(1.5),
  },
  
  // タッチフレンドリーな調整
  '& .MuiTextField-root': {
    '& .MuiInputBase-root': {
      minHeight: '48px', // タッチターゲットの最小サイズ
    },
    '& .MuiInputBase-input': {
      fontSize: '16px', // iOS Safari でのズーム防止
    },
  },
  
  '& .MuiButton-root': {
    minHeight: '48px', // タッチターゲットの最小サイズ 
    minWidth: '120px',
    fontSize: '16px',
    
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
}));

export const YearConverter: React.FC<YearConverterProps> = ({
  className,
  onConvert
}) => {
  const [inputValue, setInputValue] = useState('');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    // デバウンス処理を追加
    const timeoutId = setTimeout(() => {
      if (!inputValue.trim()) {
        setConversionResult(null);
        setError(null);
        return;
      }

      const yearNum = parseInt(inputValue, 10);
      if (isNaN(yearNum)) {
        setError('整数を入力してください');
        setConversionResult(null);
        return;
      }

      const result = convertWesternToEra(yearNum);
      if (result.success && result.eraName && result.eraYear && result.fullText) {
        const conversionData: ConversionResult = {
          westernYear: yearNum,
          eraName: result.eraName,
          eraYear: result.eraYear,
          fullText: result.fullText
        };
        setConversionResult(conversionData);
        setError(null);
      } else {
        setError(result.error || '変換に失敗しました');
        setConversionResult(null);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  // 変換結果が変わった時にコールバックを呼ぶ（無限ループを避けるため分離）
  useEffect(() => {
    if (conversionResult && onConvert) {
      onConvert(conversionResult);
    }
  }, [conversionResult, onConvert]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    setConversionResult(null);
    setError(null);
  };

  const handleCopyResult = async () => {
    if (conversionResult && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(conversionResult.fullText);
        setCopyFeedback(true);
      } catch (error) {
        console.error('コピーに失敗しました:', error);
      }
    }
  };

  const handleCloseFeedback = () => {
    setCopyFeedback(false);
  };

  return (
    <Box className={className}>
      <InputContainer>
        <TextField
          id="year-input"
          label="西暦を入力"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="例: 1950"
          helperText="1950-2025年に対応"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: inputValue && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  size="small"
                  aria-label="クリア"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!error}
        />
        <Button
          variant="outlined"
          onClick={handleClear}
          startIcon={<ClearIcon />}
          sx={{ minWidth: '120px' }}
        >
          クリア
        </Button>
      </InputContainer>

      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Fade>
      )}

      {conversionResult && (
        <Fade in={!!conversionResult}>
          <Box>
            <Typography variant="h6" gutterBottom>
              変換結果
            </Typography>
            <ResultPaper
              data-testid="conversion-result"
              onClick={handleCopyResult}
              elevation={2}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" color="primary" component="div">
                  {conversionResult.fullText}
                </Typography>
                <IconButton
                  size="small"
                  color="primary"
                  aria-label="コピー"
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                クリックしてコピー
              </Typography>
            </ResultPaper>
          </Box>
        </Fade>
      )}

      <Snackbar
        open={copyFeedback}
        autoHideDuration={2000}
        onClose={handleCloseFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseFeedback} severity="success" sx={{ width: '100%' }}>
          コピーしました！
        </Alert>
      </Snackbar>
    </Box>
  );
};