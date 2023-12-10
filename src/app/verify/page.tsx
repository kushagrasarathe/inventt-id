import { VerifyForm } from "./verify-form";

export default function page() {
  return (
    <div className=" flex h-full min-h-[80dvh] flex-col items-center justify-center gap-y-3">
      <div className="w-7/12">
        <VerifyForm />
      </div>
    </div>
  );
}
