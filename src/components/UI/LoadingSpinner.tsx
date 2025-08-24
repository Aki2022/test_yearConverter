import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Fade,
  LinearProgress,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

interface LoadingSpinnerProps {
  size?: number | 'small' | 'medium' | 'large';
  variant?: 'circular' | 'linear' | 'dots';
  text?: string;
  color?: 'primary' | 'secondary' | 'inherit';
  thickness?: number;
  fullScreen?: boolean;
  delay?: number;
}

// カスタムアニメーション定義
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const dotsAnimation = keyframes`
  0%, 20% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoadingContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fullScreen',
})<{ fullScreen: boolean }>(({ theme, fullScreen }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  
  ...(fullScreen && {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: theme.zIndex.modal,
    backdropFilter: 'blur(4px)',
  }),
}));

const AnimatedCircularProgress = styled(CircularProgress)(({ theme }) => ({
  animation: `${pulseAnimation} 2s ease-in-out infinite`,
}));

const DotsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

const Dot = styled(Box)<{ delay: number }>(({ theme, delay }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  animation: `${dotsAnimation} 1.4s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  fontWeight: 500,
}));

const LinearProgressContainer = styled(Box)(({ theme }) => ({
  width: '200px',
  maxWidth: '80vw',
}));

const DotsSpinner: React.FC<{ color: string }> = ({ color }) => (
  <DotsContainer>
    <Dot delay={0} />
    <Dot delay={0.2} />
    <Dot delay={0.4} />
  </DotsContainer>
);

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  variant = 'circular',
  text,
  color = 'primary',
  thickness = 3.6,
  fullScreen = false,
  delay = 0,
}) => {
  const getSize = (): number => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'small': return 24;
      case 'large': return 60;
      default: return 40;
    }
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'linear':
        return (
          <LinearProgressContainer>
            <LinearProgress 
              color={color}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </LinearProgressContainer>
        );
      case 'dots':
        return <DotsSpinner color={color} />;
      default:
        return (
          <AnimatedCircularProgress
            size={getSize()}
            thickness={thickness}
            color={color}
            data-testid="circular-progress"
          />
        );
    }
  };

  return (
    <Fade in timeout={{ appear: delay, enter: 300 }}>
      <LoadingContainer
        data-testid="loading-spinner"
        fullScreen={fullScreen}
        role="status"
        aria-label="読み込み中"
      >
        {renderSpinner()}
        {text && (
          <LoadingText variant="body2" data-testid="loading-text">
            {text}
          </LoadingText>
        )}
      </LoadingContainer>
    </Fade>
  );
};

export default LoadingSpinner;