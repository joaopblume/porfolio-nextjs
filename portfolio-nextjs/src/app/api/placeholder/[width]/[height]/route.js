export async function GET(request, { params }) {
    const { width, height } = params;
    
    // Create a canvas to generate our placeholder
    const canvas = new OffscreenCanvas(Number(width), Number(height));
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Text
    const text = `${width} × ${height}`;
    ctx.fillStyle = '#888888';
    ctx.font = `${Math.max(12, Math.min(30, canvas.width / 10))}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Convert to blob
    const blob = await canvas.convertToBlob({ type: 'image/png' });
    const arrayBuffer = await blob.arrayBuffer();
    
    // Return response
    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  }