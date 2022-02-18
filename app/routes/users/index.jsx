import { Link, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    users: await db.user.findMany({
      take: 15,
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
};

function UserItems() {
  const { users } = useLoaderData();
  return (
    <>
      <div className="page-header">
        <h1>Users</h1>
        <Link to="/users/new" className="btn">
          New User
        </Link>
      </div>

      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>
              <h3>{user.name}</h3>
              {new Date(user.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserItems;
