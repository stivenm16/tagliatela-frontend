'use client'

import Image from 'next/image'
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

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc('/images/card-reference-image.png')}
    />
  )
}
