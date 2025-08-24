import React from 'react';
import {
  Container,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

const StyledMainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  maxWidth: '600px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '375px',
    gap: theme.spacing(2),
  },
}));

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledMainContainer
      data-testid="main-layout"
      role="main"
      component="main"
    >
      <ContentWrapper maxWidth={false}>
        {children}
      </ContentWrapper>
    </StyledMainContainer>
  );
};

export default MainLayout;