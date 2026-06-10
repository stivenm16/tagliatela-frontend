'use client'

import { useState } from 'react'

export function ImageComponent({
  src,
  alt,
  width = 200,
  height = 400,
  className,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative inline-block">
      {isLoading && (
        <div
          className="bg-gray-200 animate-pulse rounded-2xl"
          style={{ width, height }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`${className ?? ''} ${isLoading ? 'absolute inset-0 opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={() => {
          setImgSrc('/images/card-reference-image.png')
          setIsLoading(false)
        }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
