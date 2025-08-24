// PWA インストールプロンプトコンポーネント
import React, { useState, useEffect } from 'react';
import {
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
  IconButton,
  Slide,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  GetApp as InstallIcon,
  Close as CloseIcon,
  CloudDownload as DownloadIcon
} from '@mui/icons-material';
import { InstallPromptManager } from '../../utils/pwaUtils';

interface InstallPromptProps {
  installManager?: InstallPromptManager;
}

interface ConnectionStatus {
  online: boolean;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ installManager }) => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // PWA インストール可能状態の監視
    const handleInstallable = () => {
      setShowInstallPrompt(true);
    };

    const handleInstalled = () => {
      setShowInstallPrompt(false);
      setIsInstalling(false);
    };

    // Service Worker 更新通知の監視
    const handleUpdateAvailable = () => {
      setShowUpdateNotification(true);
    };

    // 接続状態の監視
    const handleConnectionChange = (event: CustomEvent<ConnectionStatus>) => {
      setIsOnline(event.detail.online);
    };

    // イベントリスナーの登録
    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);
    window.addEventListener('sw-update-available', handleUpdateAvailable);
    window.addEventListener('connection-change', handleConnectionChange as EventListener);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      window.removeEventListener('sw-update-available', handleUpdateAvailable);
      window.removeEventListener('connection-change', handleConnectionChange as EventListener);
    };
  }, []);

  const handleInstall = async () => {
    if (!installManager) return;
    
    setIsInstalling(true);
    try {
      await installManager.promptInstall();
    } catch (error) {
      console.error('[InstallPrompt] Install failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleCloseInstallPrompt = () => {
    setShowInstallPrompt(false);
  };

  const handleCloseUpdateNotification = () => {
    setShowUpdateNotification(false);
  };

  const handleRefreshApp = () => {
    window.location.reload();
  };

  return (
    <>
      {/* インストールプロンプト */}
      <Snackbar
        open={showInstallPrompt}
        anchorOrigin={{ 
          vertical: isMobile ? 'bottom' : 'top', 
          horizontal: 'center' 
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: isMobile ? 'up' : 'down' } as any}
      >
        <Alert
          severity="info"
          sx={{
            width: '100%',
            maxWidth: 400,
            '& .MuiAlert-message': {
              width: '100%'
            }
          }}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                color="inherit"
                size="small"
                onClick={handleInstall}
                disabled={isInstalling}
                startIcon={<InstallIcon />}
                sx={{ minWidth: 'auto' }}
              >
                {isInstalling ? 'インストール中...' : 'インストール'}
              </Button>
              <IconButton
                size="small"
                color="inherit"
                onClick={handleCloseInstallPrompt}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          }
        >
          <Typography variant="body2" component="div">
            <strong>和暦変換アプリ</strong>をホーム画面に追加しませんか？
            <br />
            <Typography variant="caption" color="text.secondary">
              オフラインでも利用可能になります
            </Typography>
          </Typography>
        </Alert>
      </Snackbar>

      {/* 更新通知 */}
      <Snackbar
        open={showUpdateNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={10000}
        onClose={handleCloseUpdateNotification}
      >
        <Alert
          severity="warning"
          sx={{ width: '100%', maxWidth: 400 }}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                color="inherit"
                size="small"
                onClick={handleRefreshApp}
                startIcon={<DownloadIcon />}
              >
                更新
              </Button>
              <IconButton
                size="small"
                color="inherit"
                onClick={handleCloseUpdateNotification}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          }
        >
          <Typography variant="body2">
            新しいバージョンが利用可能です
          </Typography>
        </Alert>
      </Snackbar>

      {/* オフライン通知 */}
      <Snackbar
        open={!isOnline}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="warning"
          sx={{ 
            width: '100%',
            backgroundColor: theme.palette.warning.dark,
            color: theme.palette.warning.contrastText
          }}
        >
          <Typography variant="body2">
            オフラインモードで動作中です
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default InstallPrompt;