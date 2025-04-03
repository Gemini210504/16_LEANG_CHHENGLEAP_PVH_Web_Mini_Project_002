
import { fetchUser } from "@/service/dashboard-service";

export default async function ProfileUser() {
  const data = await fetchUser();
  return (
    <>
      <div className="flex flex-row items-center justify-center space-x-5 mr-10">
        <img
          className="w-15 h-15 rounded-full object-cover"
          src={data?.payload?.profile || "https://via.placeholder.com/40"}
          alt="Profile"
        />
        <div className="flex flex-col">
          <p className=" text-2xl font-medium">
            {data?.payload?.username || "Username not available"}
          </p>
          <p className="mt-3 text-[#009990]">
            {data?.payload?.email || "Email not available"}
          </p>
        </div>
      </div>
    </>
  );
}
