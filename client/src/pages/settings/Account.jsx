import Setting from "./Setting";

export default function Account() {
  return (
    <Setting>
      <div className="px-5 py-2">
        <h1 className="text-3xl font-bold">Account</h1>
        <div className="mt-2">
          <p className="p-4 hover:bg-neutral-600">Logout</p>
        </div>
      </div>
    </Setting>
  );
}
