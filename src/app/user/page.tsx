import { cookies } from "next/headers";

const UserPage = async () => {
  const res = await fetch("http://localhost:5000/api/users/profile", {
    headers: { Cookie: cookies().toString() },
  });
  const data = await res.json();

  return (
    <div>
      {
        <div className="py-20 grid place-items-center">
          <h1 className="text-4xl font-semibold text-center capitalize">
            {data.name || data}
          </h1>
        </div>
      }
    </div>
  );
};

export default UserPage;
