import { connectToDatabase } from "../util/mongodb";

interface User {
    username: string,
    email: string
}

const Users = ({ users }: any) => {
  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {/* {users.map((user: User) => (
          <li key={user.username}>
            <h2>{user.email}</h2>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const users = await db
    .collection("users")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

    console.log('users', users);

  return {
    props: {
        users: JSON.parse(JSON.stringify(users)),
    },
  };
}

export default Users;