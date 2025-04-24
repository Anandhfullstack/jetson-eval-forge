
import { ReactNode } from "react";
import NavBar from "./NavBar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-jetson-pink/20 flex flex-col">
      <NavBar />
      <main className="container mx-auto px-4 py-8 flex-1 max-w-7xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 min-h-[calc(100vh-10rem)]">
          {children}
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          Axiomtek LLM Evaluation Kit © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
