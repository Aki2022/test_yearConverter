// パフォーマンス監視ユーティリティ

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

interface WebVitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * パフォーマンスメトリクスを取得
 */
export const getPerformanceMetrics = (): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    const metrics: PerformanceMetrics = {};

    // Performance Observer でメトリクス収集
    if ('PerformanceObserver' in window) {
      // FCP と LCP の監視
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime;
          }
        });
      });

      paintObserver.observe({ entryTypes: ['paint'] });

      // LCP の監視
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.lcp = lastEntry.startTime;
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID の監視
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          metrics.fid = entry.processingStart - entry.startTime;
        });
      });

      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS の監視
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            metrics.cls = clsValue;
          }
        });
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Navigation Timing API から TTFB を取得
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        metrics.ttfb = navigation.responseStart - navigation.requestStart;
      }
    }

    // 一定時間後にメトリクスを返す
    setTimeout(() => {
      resolve(metrics);
    }, 1000);
  });
};

/**
 * Web Vitals データの評価
 */
export const evaluateWebVitals = (data: WebVitalsData): void => {
  console.log(`[Performance] ${data.name}: ${data.value}ms (${data.rating})`);
  
  // 本番環境では分析サービスに送信
  if (process.env.NODE_ENV === 'production') {
    // Analytics サービスに送信（将来の実装）
    sendToAnalytics(data);
  }
};

/**
 * 分析サービスへの送信（将来の実装）
 */
const sendToAnalytics = (data: WebVitalsData): void => {
  // Google Analytics や他の分析サービスに送信
  if ('gtag' in window) {
    (window as any).gtag('event', data.name, {
      event_category: 'Web Vitals',
      value: Math.round(data.value),
      event_label: data.id,
      non_interaction: true,
    });
  }
};

/**
 * リソースローディング時間の測定
 */
export const measureResourceTiming = (): void => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    resources.forEach((resource) => {
      const duration = resource.responseEnd - resource.startTime;
      if (duration > 1000) { // 1秒以上のリソースをログ
        console.warn(`[Performance] Slow resource: ${resource.name} (${Math.round(duration)}ms)`);
      }
    });
  }
};

/**
 * メモリ使用量の監視
 */
export const measureMemoryUsage = (): void => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('[Performance] Memory usage:', {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
    });
  }
};

/**
 * パフォーマンス監視の初期化
 */
export const initPerformanceMonitoring = (): void => {
  // Web Vitals の監視開始
  if (typeof window !== 'undefined') {
    // 定期的なメトリクス測定
    setTimeout(() => {
      measureResourceTiming();
      measureMemoryUsage();
    }, 3000);

    // ページ離脱時にメトリクス送信
    window.addEventListener('beforeunload', () => {
      getPerformanceMetrics().then((metrics) => {
        console.log('[Performance] Final metrics:', metrics);
      });
    });
  }
};