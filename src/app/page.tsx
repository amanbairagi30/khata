import { ThemeToggler } from "@/components/ThemeToggle";
import GenerateWallet from "./GenerateWallet";

export default function Home() {
  return (
    <main className="border-2 h-screen max-h-fit max-w-[1280px] mx-auto">
      <div className="flex items-center px-4 h-[4rem] border-b-2 justify-between">

        <div className="text-4xl font-semibold">Khata</div>

        <ThemeToggler />
      </div>

      <div className="m-4 h-[calc(100vh-6rem)] overflow-y-auto">
        <GenerateWallet />
      </div>
    </main>
  );
}
