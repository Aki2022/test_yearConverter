import React, { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Skeleton,
  Box,
  Fade,
  Grow,
  Slide,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

interface AnimatedCardProps {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
  elevation?: number;
  animationType?: 'hover' | 'slide' | 'grow' | 'fade';
  delay?: number;
  interactive?: boolean;
  onClick?: () => void;
}

// アニメーション効果の定義
const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const rippleEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => !['isHovered', 'interactive', 'animationType'].includes(prop as string),
})<{ 
  isHovered: boolean; 
  interactive: boolean; 
  animationType: 'hover' | 'slide' | 'grow' | 'fade';
}>(({ theme, isHovered, interactive, animationType }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  cursor: interactive ? 'pointer' : 'default',
  
  // ベースのトランジション
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  // ホバー効果（animationType="hover"の場合）
  ...(animationType === 'hover' && {
    transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0px) scale(1)',
    boxShadow: isHovered
      ? theme.shadows[12]
      : theme.shadows[2],
  }),
  
  // グロー効果の追加
  ...(isHovered && interactive && {
    animation: `${pulseGlow} 1.5s infinite`,
  }),
  
  // フォーカス管理の改善
  '&:focus': {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
  
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },

  // タッチデバイス用の調整
  '@media (hover: none)': {
    '&:active': {
      transform: 'scale(0.98)',
      boxShadow: theme.shadows[1],
    },
  },
  
  // リップル効果用の疑似要素
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${theme.palette.primary.main}40 1px, transparent 1px)`,
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.6s, height 0.6s',
    pointerEvents: 'none',
    zIndex: 0,
  },
  
  '&:active::before': {
    width: '300px',
    height: '300px',
    animation: `${rippleEffect} 0.6s linear`,
  },
  
  // 子要素をリップル効果の上に表示
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const LoadingSkeleton = styled(Box)(({ theme }) => ({
  '& .MuiSkeleton-root': {
    backgroundColor: theme.palette.action.hover,
    '&::after': {
      background: `linear-gradient(90deg, transparent, ${theme.palette.action.selected}, transparent)`,
    },
  },
}));

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  children,
  loading = false,
  elevation = 2,
  animationType = 'hover',
  delay = 0,
  interactive = true,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (interactive) {
      setIsHovered(true);
    }
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    if (interactive) {
      setIsHovered(false);
    }
  }, [interactive]);

  const handleClick = useCallback(() => {
    if (onClick && interactive) {
      onClick();
    }
  }, [onClick, interactive]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && onClick && interactive) {
      event.preventDefault();
      onClick();
    }
  }, [onClick, interactive]);

  // ローディング状態の表示
  if (loading) {
    return (
      <Fade in timeout={300 + delay}>
        <Card
          data-testid="animated-card-loading"
          elevation={elevation}
          role="article"
          aria-busy="true"
          aria-label="読み込み中"
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <CardHeader
            title={
              <LoadingSkeleton>
                <Skeleton 
                  variant="text" 
                  width="60%" 
                  height={32} 
                  animation="wave"
                />
              </LoadingSkeleton>
            }
          />
          <CardContent>
            <LoadingSkeleton data-testid="loading-skeleton">
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={60} 
                animation="wave"
                sx={{ borderRadius: 1, mb: 1 }}
              />
              <Skeleton 
                variant="text" 
                width="80%" 
                height={24} 
                animation="wave"
                sx={{ mb: 0.5 }}
              />
              <Skeleton 
                variant="text" 
                width="60%" 
                height={24} 
                animation="wave"
              />
            </LoadingSkeleton>
          </CardContent>
        </Card>
      </Fade>
    );
  }

  // アニメーションタイプに応じたラッパー
  const AnimationWrapper = ({ children: wrapperChildren }: { children: React.ReactNode }) => {
    switch (animationType) {
      case 'slide':
        return (
          <Slide direction="up" in timeout={500 + delay}>
            <div>{wrapperChildren}</div>
          </Slide>
        );
      case 'grow':
        return (
          <Grow in timeout={400 + delay}>
            <div>{wrapperChildren}</div>
          </Grow>
        );
      case 'fade':
        return (
          <Fade in timeout={300 + delay}>
            <div>{wrapperChildren}</div>
          </Fade>
        );
      default:
        return (
          <Fade in timeout={300 + delay}>
            <div>{wrapperChildren}</div>
          </Fade>
        );
    }
  };

  return (
    <AnimationWrapper>
      <StyledCard
        data-testid="animated-card"
        elevation={elevation}
        isHovered={isHovered}
        interactive={interactive}
        animationType={animationType}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        role={interactive ? "button" : "article"}
        tabIndex={interactive ? 0 : -1}
        aria-label={interactive ? `${title}をクリック` : title}
      >
        <CardHeader
          title={
            <Typography 
              variant="h5" 
              component="h2" 
              color="primary"
              sx={{
                fontWeight: 500,
                transition: 'color 0.2s ease-in-out',
                ...(isHovered && {
                  color: 'primary.dark',
                }),
              }}
            >
              {title}
            </Typography>
          }
        />
        <CardContent>
          {children}
        </CardContent>
      </StyledCard>
    </AnimationWrapper>
  );
};

export default AnimatedCard;