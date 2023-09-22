import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  console.log(request.headers);
  console.log(request.headers.get('x-nonce'))
  return NextResponse.json({ res: [
    1,2,4,5
  ] })
}