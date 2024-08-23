import { ThemeToggler } from "@/components/ThemeToggle";
import GenerateWallet from "./GenerateWallet";

export default function Home() {
  return (
    <main className="border-2 min-h-screen max-h-fit max-w-[1280px] mx-auto">
      <div className="flex items-start justify-between">

        <div className="text-4xl font-semibold">Khata</div>

        <ThemeToggler />
      </div>

      <div>
        <GenerateWallet />
      </div>
    </main>
  );
}
