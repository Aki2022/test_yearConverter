import React from 'react';
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
  fixed?: boolean;
  className?: string;
}

const StyledContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  padding: isMobile ? theme.spacing(2) : theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: isMobile ? theme.spacing(2) : theme.spacing(3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  boxSizing: 'border-box',
  
  // レスポンシブな最大幅設定
  [theme.breakpoints.up('xs')]: {
    maxWidth: '375px',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '600px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '768px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1024px',
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1200px',
  },
}));

const ResponsiveWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'md',
  disableGutters = false,
  fixed = false,
  className,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <ResponsiveWrapper>
      <StyledContainer
        data-testid="responsive-container"
        maxWidth={maxWidth}
        disableGutters={disableGutters}
        fixed={fixed}
        className={className}
        isMobile={isMobile}
        role="region"
        aria-label="レスポンシブコンテナ"
      >
        {children}
      </StyledContainer>
    </ResponsiveWrapper>
  );
};

export default ResponsiveContainer;