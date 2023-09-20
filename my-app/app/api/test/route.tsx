import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  console.log(request);
  const res = request.headers
  return NextResponse.json({ res: [
    1,2,4,5
  ] })
}