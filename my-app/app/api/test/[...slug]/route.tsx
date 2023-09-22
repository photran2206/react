import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/app/util/mongodb";

const handle = async () => {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("users")
    .find({}).project({ username: 1, email: 1, _id: 0 })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();

  console.log('movies', movies)
  return movies

  // return {
  //   props: {
  //     movies: JSON.parse(JSON.stringify(movies)),
  //   },
  // };
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // console.log(request.headers.get('x-nonce'));
  const data = await handle();
  const slug = params.slug // 'a', 'b', or 'c'
  console.log(slug);
  return NextResponse.json({ data })
}