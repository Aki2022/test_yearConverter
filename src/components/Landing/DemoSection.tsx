import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { AnimatedCard } from '../UI';
import { YearConverter } from '../YearConverter';
import type { ConversionResult } from '../YearConverter/YearConverter.types';

export const DemoSection: React.FC = () => {
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

  const handleConvert = (result: ConversionResult) => {
    setConversionResult(result);
  };

  return (
    <Box data-testid="demo-section" sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="md">
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ mb: 2 }}
        >
          デモ
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          textAlign="center" 
          color="text.secondary" 
          sx={{ mb: 6 }}
        >
          実際に和暦変換を体験してみてください
        </Typography>

        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <AnimatedCard
            title="和暦変換デモ"
            animationType="slide"
            delay={200}
            interactive={false}
          >
            <YearConverter onConvert={handleConvert} />
          </AnimatedCard>

          {conversionResult && (
            <Box sx={{ mt: 3 }}>
              <AnimatedCard
                title="変換結果"
                animationType="grow"
                delay={300}
                interactive={true}
                onClick={() => {
                  if (navigator.clipboard && conversionResult.fullText) {
                    navigator.clipboard.writeText(conversionResult.fullText);
                  }
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h4" 
                    component="div" 
                    color="primary"
                    sx={{ 
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1.8rem', sm: '2.125rem' }
                    }}
                  >
                    {conversionResult.fullText}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    クリックしてコピー
                  </Typography>
                </Box>
              </AnimatedCard>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};