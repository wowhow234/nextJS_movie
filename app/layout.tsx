import Navigation from "../components/navigation";
import StoreProvider from "./StoreProvider";
import "./global.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navigation />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
