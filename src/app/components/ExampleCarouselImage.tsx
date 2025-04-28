'use client';

import Image from 'next/image';

interface ExampleCarouselImageProps {
  text: string;
}

export default function ExampleCarouselImage({ text }: ExampleCarouselImageProps) {
  return (
    <div className="w-100" style={{ height: '600px', position: 'relative', backgroundColor: 'black' }}>
      <Image
        src="/images/grunge-black-concrete-textured-background.jpg"
        alt={text}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
} 