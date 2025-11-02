"use client";
import React from 'react';

// BrandLogo component - renders the horizontal SVG from public/branding
export default function BrandLogo({
  width = 240,
  height = 56,
  variant = 'horizontal', // 'horizontal' | 'cr-es-horizontal' | 'cr-es-vertical'
  className = ''
}) {
  const map = {
    horizontal: '/branding/cruzroja_logo_horizontal.svg',
    'cr-es-horizontal': '/branding/CR-ES-Horizontal-RGB.svg',
    'cr-es-vertical': '/branding/CR-ES-Vertical-RGB.svg'
  };

  const src = map[variant] || map.horizontal;

  return (
    <img
      src={src}
      alt="Cruz Roja"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
