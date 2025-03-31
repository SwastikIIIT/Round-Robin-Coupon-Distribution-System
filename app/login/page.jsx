import LoginForm from "@/components/LoginForm";


export default function LoginPage() {
  return (
    <div className="bg-muted flex flex-col min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm/>
      </div>
    </div>
  );
}
