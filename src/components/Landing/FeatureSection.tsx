import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Speed, Verified, TouchApp } from '@mui/icons-material';
import { AnimatedCard } from '../UI';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => (
  <AnimatedCard
    title={title}
    animationType="grow"
    delay={delay}
    interactive={false}
  >
    <Box sx={{ textAlign: 'center' }}>
      <Box 
        data-testid="feature-icon" 
        sx={{ 
          mb: 2, 
          color: 'primary.main',
          display: 'flex',
          justifyContent: 'center',
          '& .MuiSvgIcon-root': {
            fontSize: '3rem',
          }
        }}
      >
        {icon}
      </Box>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ lineHeight: 1.6 }}
      >
        {description}
      </Typography>
    </Box>
  </AnimatedCard>
);

export const FeatureSection: React.FC = () => {
  return (
    <Box data-testid="feature-section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ mb: 2 }}
        >
          機能紹介
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          textAlign="center" 
          color="text.secondary" 
          sx={{ mb: 6 }}
        >
          和暦変換アプリの主な特徴とベネフィット
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<Speed />}
              title="リアルタイム変換"
              description="入力と同時に瞬時に和暦変換。時間短縮で効率的な作業を実現します。"
              delay={100}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<Verified />}
              title="正確な年号対応"
              description="昭和・平成・令和の年号に完全対応。正確性を重視した変換結果を提供します。"
              delay={200}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<TouchApp />}
              title="使いやすいインターフェース"
              description="Material Designによる直感的なUI。誰でも簡単に操作できるデザインです。"
              delay={300}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};