import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Avatar } from '@mui/material';
import { Edit, PlayArrow, CheckCircle } from '@mui/icons-material';

interface GuideStepProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const GuideStep: React.FC<GuideStepProps> = ({ step, icon, title, description }) => (
  <Card data-testid={`guide-step-${step}`} sx={{ height: '100%', textAlign: 'center' }}>
    <CardContent>
      <Avatar 
        data-testid={`step-icon-${step}`}
        sx={{ 
          bgcolor: 'primary.main', 
          width: 64, 
          height: 64, 
          mx: 'auto', 
          mb: 2,
          fontSize: '1.5rem'
        }}
      >
        {icon}
      </Avatar>
      <Typography variant="h6" component="h3" gutterBottom>
        ステップ {step}
      </Typography>
      <Typography variant="h6" component="h4" gutterBottom color="primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export const GuideSection: React.FC = () => {
  return (
    <Box data-testid="guide-section" sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg" data-testid="guide-container">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          使い方ガイド
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          textAlign="center" 
          color="text.secondary" 
          sx={{ mb: 6 }}
        >
          3つの簡単なステップで和暦変換
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <GuideStep
              step={1}
              icon={<Edit />}
              title="西暦を入力"
              description="1950年以降の西暦を入力フィールドに入力してください。数値のみを入力します。"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <GuideStep
              step={2}
              icon={<PlayArrow />}
              title="変換ボタンをクリック"
              description="入力した西暦を和暦に変換するため、変換ボタンをクリックしてください。"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <GuideStep
              step={3}
              icon={<CheckCircle />}
              title="結果を確認"
              description="変換された和暦が表示されます。昭和・平成・令和の形式で正確に表示されます。"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            💡 ヒント: リアルタイム変換機能により、入力と同時に結果が表示されます
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};