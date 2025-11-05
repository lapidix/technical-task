import { Header } from "@/widget/header";

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Vault</h1>
          <p className="text-gray-400">
            Supply your tokens into a secure Vault to effortlessly earn
            optimized yield
          </p>
        </div>

        <div className="text-gray-500 text-center py-20 animate-fade-in">
          Connect your wallet to view vaults
        </div>
      </main>
    </div>
  );
};
