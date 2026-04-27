import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

const LazyImage = ({ src, alt, className = '', fallback }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* 로딩 중 shimmer */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#D4CFC8] animate-pulse rounded-inherit" />
      )}

      <img
        src={error && fallback ? fallback : src}
        alt={alt}
        loading="lazy"
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
      />
    </div>
  );
};

export default LazyImage;
