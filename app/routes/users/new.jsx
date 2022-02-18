import { Link, redirect, useActionData, json } from "remix";
import { db } from "~/utils/db.server";

function validateName(name) {
  if (typeof name !== "string" || name.length < 3) {
    return "Name should be at least 3 charecters long";
  }
}

function validateBody(body) {
  if (typeof body !== "string" || body.length < 10) {
    return "Body should be at least 10 charecters long";
  }
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const body = form.get("body");

  const fields = { name, body };

  const fieldErrors = {
    name: validateName(name),
    body: validateBody(body),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const user = await db.user.create({ data: fields });

  return redirect(`/users/${user.id}`);
};

function NewUser() {
  const actionData = useActionData();
  return (
    <>
      <div className="page-header">
        <h1>New User</h1>
        <Link to="/users" className="btn btn-reverse">
          Back
        </Link>
      </div>

      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={actionData?.fields?.name}
            />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.name && actionData?.fieldErrors?.name}
              </p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="body">Description</label>
            <textarea
              name="body"
              id="body"
              defaultValue={actionData?.fields?.body}
            />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.body && actionData?.fieldErrors?.body}
              </p>
            </div>
          </div>
          <button type="submit" className="btn btn-block">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default NewUser;
