import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import { initPWA, InstallPromptManager } from '../utils/pwaUtils';
import { initPerformanceMonitoring } from '../utils/performance';
import InstallPrompt from '../components/PWA/InstallPrompt';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const materialTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#424242',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#388e3c',
    },
  },
  typography: {
    fontFamily: 'Roboto, Noto Sans JP, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 600,
      lg: 1024,
      xl: 1920,
    },
  },
  spacing: 8,
});

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [installManager, setInstallManager] = useState<InstallPromptManager | null>(null);

  useEffect(() => {
    // 静的エクスポート環境でのクライアントサイド初期化
    const initializeApp = async () => {
      // ブラウザ環境でのみ実行
      if (typeof window === 'undefined') return;
      
      try {
        // パフォーマンス監視開始（ブラウザでのみ）
        if (typeof navigator !== 'undefined') {
          initPerformanceMonitoring();
        }
        
        // PWA 機能の初期化（ブラウザでのみ）
        if ('serviceWorker' in navigator) {
          const manager = await initPWA();
          setInstallManager(manager);
        }
        
        console.log('[App] Application initialized successfully');
      } catch (error) {
        console.error('[App] Initialization failed:', error);
        // エラーが発生しても続行
      }
    };

    // クライアントサイドでのみ実行
    initializeApp();
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={materialTheme}>
        <CssBaseline />
        <Component {...pageProps} />
        <InstallPrompt installManager={installManager || undefined} />
      </ThemeProvider>
    </CacheProvider>
  );
}