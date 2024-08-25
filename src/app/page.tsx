import { ThemeToggler } from "@/components/ThemeToggle";
import GenerateWallet from "./GenerateWallet";

export default function Home() {
  return (
    <main className=" h-fit max-w-[1280px] mx-auto">
      <div className="flex mx-4 py-6 border-opacity-0 items-center h-fit justify-between">

        <div className="text-4xl font-semibold">Khata</div>

        <ThemeToggler />
      </div>

      <div className="m-4 min-h-[calc(100vh-8rem)] max-h-fit">
        <GenerateWallet />
      </div>
    </main>
  );
}
