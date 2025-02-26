import { PropsWithChildren } from "react";
import Header from "./Header";

function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="container min-h-screen mx-auto px-4 py-8">
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
