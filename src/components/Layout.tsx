import { PropsWithChildren } from "react";
import Header from "./Header";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <main className="container min-h-screen mx-auto px-16 py-6">
        <Header />
        {children}
      </main>

      {/* footer */}
      <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
        <div className="text-center container text-gray-200 mx-auto">
          <p>Made by Adarsh Shukla</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
