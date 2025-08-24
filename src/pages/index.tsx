import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { HeroSection, FeatureSection, DemoSection, GuideSection } from '../components/Landing';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>和暦変換 - 美しく使いやすい西暦・和暦変換ツール</title>
        <meta name="description" content="1950年以降の西暦を和暦に簡単変換。Material Design準拠の美しいUIで、スマホでも快適に使えます。" />
        <meta name="keywords" content="和暦,西暦,変換,昭和,平成,令和,年号,変換ツール" />
        
        {/* OGP メタタグ */}
        <meta property="og:title" content="和暦変換 - 美しく使いやすい西暦・和暦変換ツール" />
        <meta property="og:description" content="1950年以降の西暦を和暦に簡単変換。Material Design準拠の美しいUIで、スマホでも快適に使えます。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://github.com/your-username/wareki-converter" />
        <meta property="og:image" content="https://github.com/your-username/wareki-converter/raw/main/public/icon-512x512.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="和暦変換 - 美しく使いやすい西暦・和暦変換ツール" />
        <meta name="twitter:description" content="1950年以降の西暦を和暦に簡単変換。Material Design準拠の美しいUIで、スマホでも快適に使えます。" />
        <meta name="twitter:image" content="https://github.com/your-username/wareki-converter/raw/main/public/icon-512x512.png" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* 構造化データ (WebApplication) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "和暦変換ツール",
              "description": "1950年以降の西暦を和暦に簡単変換。Material Design準拠の美しいUIで、スマホでも快適に使えます。",
              "url": "https://github.com/your-username/wareki-converter",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "JPY"
              },
              "featureList": [
                "リアルタイム西暦・和暦変換",
                "昭和・平成・令和対応",
                "Material Design準拠UI",
                "レスポンシブデザイン",
                "高速変換処理"
              ],
              "browserRequirements": "HTML5準拠ブラウザ",
              "permissions": "なし",
              "screenshot": "https://github.com/your-username/wareki-converter/raw/main/public/icon-512x512.png"
            })
          }}
        />
      </Head>

      <Box component="main" role="main" data-testid="landing-page">
        <Box data-testid="responsive-container">
          <HeroSection />
          <FeatureSection />
          <DemoSection />
          <GuideSection />
        </Box>
      </Box>
    </>
  );
}