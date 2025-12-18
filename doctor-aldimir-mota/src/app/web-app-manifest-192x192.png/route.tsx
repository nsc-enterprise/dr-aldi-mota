import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: '#2563eb',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20px',
          fontWeight: 'bold',
        }}
      >
        DM
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
