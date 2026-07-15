import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  // Lemos a imagem original do disco
  const imagePath = join(process.cwd(), 'public/assets/Mii_head.png');
  const base64Image = readFileSync(imagePath).toString('base64');
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Renderizamos a imagem com scale-up agressivo (240%) para cortar as margens transparentes e ficar gigante */}
        <img 
          src={`data:image/png;base64,${base64Image}`} 
          style={{ 
            width: '240%', 
            height: '240%', 
            objectFit: 'contain',
            transform: 'translateY(12%)'
          }} 
        />
      </div>
    ),
    { ...size }
  );
}
