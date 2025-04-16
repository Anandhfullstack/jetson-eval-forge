
import { ReactNode } from "react";
import NavBar from "./NavBar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-jetson-pink flex flex-col">
      <NavBar />
      <main className="container mx-auto px-4 py-6 flex-1">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
