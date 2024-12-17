import { ThemeProvider } from "./components/providers/themeprovider";
import Header from "./section/Header";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className="mx-auto max-w-7xl">
        <Header />
      </div>
    </ThemeProvider>
  );
}
