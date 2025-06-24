import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "./components/theme-provider";

function App() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-5">
      <Button>Click me</Button>
      <Switch
        onCheckedChange={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      />
    </div>
  );
}

export default App;
