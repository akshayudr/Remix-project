import { redirect } from "remix";
import { Link } from "remix";
import { useParams, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const user = await db.user.findUnique({
    where: { id: params.userId },
  });

  if (!user) throw new Error("User not found");

  const data = { user };
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const user = await db.user.findUnique({
      where: { id: params.userId },
    });

    if (!user) throw new Error("User not found");

    await db.user.delete({ where: { id: params.userId } });
    return redirect("/users");
  }
};

function User() {
  const { user } = useLoaderData();

  return (
    <div>
      <div className="page-header">
        <h1>{user.name}</h1>
        <Link to="/users" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">{user.body}</div>

      <div className="page-footer">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">Delete</button>
        </form>
      </div>
    </div>
  );
}

export default User;
