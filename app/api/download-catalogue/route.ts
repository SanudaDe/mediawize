import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), 'public', 'downloads', 'WizeTV_studio_catalogue.pdf');

    if (!fs.existsSync(pdfPath)) {
      return new NextResponse('PDF not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(pdfPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="WizeTV_studio_catalogue.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error serving catalogue PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
