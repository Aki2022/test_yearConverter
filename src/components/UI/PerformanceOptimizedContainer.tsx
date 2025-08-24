import React, { useMemo, memo, Suspense } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoadingSpinner from './LoadingSpinner';

interface PerformanceOptimizedContainerProps {
  children: React.ReactNode;
  className?: string;
  enableVirtualization?: boolean;
  lazy?: boolean;
  backgroundColor?: string;
  minHeight?: string | number;
}

const OptimizedBox = styled(Box, {
  shouldForwardProp: (prop) => !['enableVirtualization'].includes(prop as string),
})<{ enableVirtualization: boolean }>`
  /* GPU アクセラレーションの有効化 */
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  
  /* レイアウトシフトの防止 */
  display: block;
  position: relative;
  
  /* パフォーマンス最適化のためのCSS */
  will-change: auto;
  isolation: isolate;
  
  /* スムーズなスクロール */
  scroll-behavior: smooth;
  
  /* メモリ効率の向上 */
  image-rendering: optimizeQuality;
  text-rendering: optimizeSpeed;
  
  ${(props) => props.enableVirtualization && `
    contain-intrinsic-size: auto;
    contain: layout style paint;
  `}
  
  ${(props) => props.theme.breakpoints.down('sm')} {
    /* モバイルでのパフォーマンス最適化 */
    transform: translateZ(0) scale3d(1, 1, 1);
  }
`;

const LazyWrapper = memo(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});

LazyWrapper.displayName = 'LazyWrapper';

const PerformanceOptimizedContainer: React.FC<PerformanceOptimizedContainerProps> = ({
  children,
  className,
  enableVirtualization = false,
  lazy = false,
  backgroundColor,
  minHeight,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // パフォーマンス最適化のためのメモ化されたスタイル
  const optimizedStyles = useMemo(() => ({
    backgroundColor: backgroundColor || 'transparent',
    minHeight: minHeight || 'auto',
    
    // モバイルでの追加最適化
    ...(isMobile && {
      '-webkit-overflow-scrolling': 'touch', // iOS での慣性スクロール
      touchAction: 'manipulation', // タッチ遅延の削除
    }),
    
    // 高DPI ディスプレイでの最適化
    '@media (-webkit-min-device-pixel-ratio: 2)': {
      imageRendering: 'crisp-edges',
    },
  }), [backgroundColor, minHeight, isMobile]);

  // 遅延読み込み用のSuspense フォールバック
  const LoadingFallback = useMemo(() => (
    <LoadingSpinner 
      variant="circular"
      size="medium"
      text="コンテンツを読み込み中..."
    />
  ), []);

  // Intersection Observer による可視性の最適化
  const intersectionObserverRef = React.useRef<IntersectionObserver | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!enableVirtualization || !containerRef.current) return;

    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 要素が表示された時の最適化処理
            entry.target.setAttribute('data-visible', 'true');
          } else {
            // 要素が非表示になった時の最適化処理
            entry.target.setAttribute('data-visible', 'false');
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    intersectionObserverRef.current.observe(containerRef.current);

    return () => {
      intersectionObserverRef.current?.disconnect();
    };
  }, [enableVirtualization]);

  // メモ化されたコンテンツ
  const memoizedContent = useMemo(() => {
    if (lazy) {
      return (
        <Suspense fallback={LoadingFallback}>
          <LazyWrapper>{children}</LazyWrapper>
        </Suspense>
      );
    }
    return children;
  }, [children, lazy, LoadingFallback]);

  return (
    <OptimizedBox
      ref={containerRef}
      className={className}
      enableVirtualization={enableVirtualization}
      sx={optimizedStyles}
      data-testid="performance-optimized-container"
      // アクセシビリティの向上
      role="region"
      aria-label="最適化されたコンテナ"
    >
      {memoizedContent}
    </OptimizedBox>
  );
};

export default memo(PerformanceOptimizedContainer);