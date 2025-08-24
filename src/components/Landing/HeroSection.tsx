import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

export const HeroSection: React.FC = () => {
  const scrollToDemo = () => {
    const demoSection = document.querySelector('[data-testid="demo-section"]');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      data-testid="hero-section"
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg" data-testid="hero-container" sx={{ position: 'relative' }}>
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          美しく使いやすい和暦変換
        </Typography>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            mb: 4,
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            fontWeight: 400,
            opacity: 0.95,
            lineHeight: 1.4,
          }}
        >
          1950年以降の西暦を瞬時に和暦へ。モダンで直感的なデザイン。
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 6, 
            opacity: 0.9,
            fontSize: { xs: '1rem', sm: '1.125rem' },
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Material Design準拠の美しいUIで、昭和・平成・令和の年号に完全対応。
          スマートフォンでも快適に使える、新世代の和暦変換ツールです。
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={scrollToDemo}
          sx={{
            bgcolor: 'white',
            color: '#1976d2',
            fontSize: { xs: '1rem', sm: '1.125rem' },
            fontWeight: 600,
            px: { xs: 3, sm: 4 },
            py: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              bgcolor: 'grey.50',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          今すぐ使ってみる
        </Button>
      </Container>
    </Box>
  );
};