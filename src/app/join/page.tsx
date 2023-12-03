import { JoinForm } from "./join-form";

export default function page() {
  return (
    <div className=" flex h-full min-h-[80vh] flex-col items-center justify-center gap-y-3">
      <div className="w-10/12">
        <JoinForm />
      </div>
    </div>
  );
}
