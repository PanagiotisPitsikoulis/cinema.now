import { Button } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/Components/app/ThemeProvider";

/**
 * ThemeSwitch component for toggling between light and dark themes instantly.
 * @returns JSX.Element
 */
export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant="light"
            size={"sm"}
            isIconOnly={true}
            onClick={toggleTheme}
        >
            {theme === "dark" ? (
                <Sun className="w-4 h-4" />
            ) : (
                <Moon className="w-4 h-4" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};
