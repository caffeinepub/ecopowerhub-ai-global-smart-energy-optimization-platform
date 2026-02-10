import { useState, useEffect, useRef } from 'react';

interface StableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
}

/**
 * StableImage component that prevents flickering during re-renders
 * by maintaining stable dimensions and avoiding transient blank states
 */
export function StableImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallbackSrc 
}: StableImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  return (
    <div 
      className={`stable-image-container ${className}`}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`stable-image ${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''}`}
        style={{
          width: width ? `${width}px` : 'auto',
          height: height ? `${height}px` : 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
        loading="lazy"
        decoding="async"
      />
      {!isLoaded && !hasError && (
        <div 
          className="stable-image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'hsl(var(--muted))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="animate-pulse text-muted-foreground text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
}
