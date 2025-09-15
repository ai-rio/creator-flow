'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface PaperShaderWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
  disabled?: boolean;
}

interface PaperShaderWrapperState {
  hasError: boolean;
  errorMessage?: string;
}

/**
 * Specialized error boundary wrapper for individual Paper Shader components
 * Catches WebGL initialization errors that occur during Paper Shader component mounting
 */
export class PaperShaderWrapper extends Component<PaperShaderWrapperProps, PaperShaderWrapperState> {
  constructor(props: PaperShaderWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): PaperShaderWrapperState {
    // Check if the error is related to Paper Shaders WebGL initialization
    if (
      error.message.includes('Paper Shaders') ||
      error.message.includes('WebGL') ||
      error.message.includes('ShaderMount')
    ) {
      return {
        hasError: true,
        errorMessage: error.message,
      };
    }

    // For other errors, let them bubble up
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Paper Shader component failed to initialize:', error.message);
    console.warn('Error details:', errorInfo);
  }

  render() {
    const { disabled, fallback, className = '', theme = 'dark', children } = this.props;

    // If disabled or has error, show fallback
    if (disabled || this.state.hasError) {
      return (
        <div className={`relative h-full w-full ${className}`}>{fallback || <PaperShaderFallback theme={theme} />}</div>
      );
    }

    return <div className={`relative h-full w-full ${className}`}>{children}</div>;
  }
}

/**
 * Simple fallback component for failed Paper Shader components
 */
const PaperShaderFallback: React.FC<{
  theme?: 'light' | 'dark';
}> = ({ theme = 'dark' }) => {
  return (
    <div
      className='h-full w-full'
      style={{
        background:
          theme === 'dark'
            ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
      }}
    />
  );
};

/**
 * Hook-based wrapper for functional components
 */
export const useSafeShader = (hasWebGL: boolean) => {
  return {
    wrapShader: (shader: ReactNode, fallback?: ReactNode) => (
      <PaperShaderWrapper disabled={!hasWebGL} fallback={fallback}>
        {shader}
      </PaperShaderWrapper>
    ),
  };
};
