import SignupForm from "./SignupForm";
import { Toaster } from "sonner";

export default function SignupPage() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <SignupForm />
    </>
  );
}
