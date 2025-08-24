// PWA 関連ユーティリティ

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

/**
 * Service Worker の登録
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | void> => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const basePath = process.env.NODE_ENV === 'production' ? '/test/wareki_convert' : '';
      const registration = await navigator.serviceWorker.register(`${basePath}/sw.js`, {
        scope: `${basePath}/`,
      });

      console.log('[PWA] Service Worker registered successfully:', registration.scope);

      // 更新検出
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] New content is available; please refresh.');
              // ユーザーに更新通知を表示（将来の実装）
              showUpdateNotification();
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error);
      throw error;
    }
  } else {
    console.warn('[PWA] Service Worker is not supported');
  }
};

/**
 * PWA インストール可能性の確認
 */
export const checkInstallability = (): boolean => {
  // PWA インストール条件のチェック
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const hasServiceWorker = 'serviceWorker' in navigator;
  const hasManifest = document.querySelector('link[rel="manifest"]') !== null;
  
  return hasServiceWorker && hasManifest && !isStandalone;
};

/**
 * インストールプロンプトの管理
 */
export class InstallPromptManager {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private installButton: HTMLElement | null = null;

  constructor() {
    this.initEventListeners();
  }

  private initEventListeners(): void {
    if (typeof window === 'undefined') return;

    // beforeinstallprompt イベントをキャッチ
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('[PWA] beforeinstallprompt fired');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // インストール完了の検出
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App was installed');
      this.hideInstallButton();
      this.deferredPrompt = null;
    });
  }

  /**
   * インストールボタンの表示
   */
  private showInstallButton(): void {
    if (this.installButton) {
      this.installButton.style.display = 'block';
    }
    // カスタムイベントを発火してコンポーネントに通知
    window.dispatchEvent(new CustomEvent('pwa-installable'));
  }

  /**
   * インストールボタンの非表示
   */
  private hideInstallButton(): void {
    if (this.installButton) {
      this.installButton.style.display = 'none';
    }
    // カスタムイベントを発火
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  }

  /**
   * インストールボタンの登録
   */
  public registerInstallButton(button: HTMLElement): void {
    this.installButton = button;
    button.addEventListener('click', () => this.promptInstall());
  }

  /**
   * インストールプロンプトの表示
   */
  public async promptInstall(): Promise<void> {
    if (!this.deferredPrompt) {
      console.warn('[PWA] No install prompt available');
      return;
    }

    try {
      await this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      
      console.log('[PWA] User choice:', choiceResult.outcome);
      
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
      } else {
        console.log('[PWA] User dismissed the install prompt');
      }
      
      this.deferredPrompt = null;
    } catch (error) {
      console.error('[PWA] Install prompt failed:', error);
    }
  }

  /**
   * インストール可能状態の確認
   */
  public isInstallable(): boolean {
    return this.deferredPrompt !== null;
  }
}

/**
 * オフライン状態の検出
 */
export const initOfflineDetection = (): void => {
  if (typeof window === 'undefined') return;

  const updateOnlineStatus = () => {
    const isOnline = navigator.onLine;
    document.body.classList.toggle('offline', !isOnline);
    
    // カスタムイベントを発火
    window.dispatchEvent(new CustomEvent('connection-change', {
      detail: { online: isOnline }
    }));
    
    console.log(`[PWA] Connection status: ${isOnline ? 'online' : 'offline'}`);
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // 初期状態の設定
  updateOnlineStatus();
};

/**
 * 更新通知の表示
 */
const showUpdateNotification = (): void => {
  // カスタムイベントを発火してUIコンポーネントに通知
  window.dispatchEvent(new CustomEvent('sw-update-available'));
};

/**
 * PWA の初期化
 */
export const initPWA = async (): Promise<InstallPromptManager> => {
  console.log('[PWA] Initializing PWA features...');
  
  // Service Worker の登録
  await registerServiceWorker();
  
  // オフライン検出の初期化
  initOfflineDetection();
  
  // インストールプロンプトマネージャーの作成
  const installManager = new InstallPromptManager();
  
  console.log('[PWA] PWA initialization complete');
  
  return installManager;
};