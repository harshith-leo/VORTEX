"use client";

import { useTheme } from "next-themes";
import { CheckSquare, Moon, Sun, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-[12px] bg-background/80 border-b border-border shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                    <div className="bg-accent text-accent-foreground p-2 rounded-xl shadow-inner drop-shadow-md">
                        <CheckSquare size={24} strokeWidth={2.5} />
                    </div>
                    <span className="font-sans font-bold text-xl tracking-tight text-foreground">
                        VORTEX
                    </span>
                </div>

                <div className="hidden sm:flex items-center justify-center flex-1 gap-2 text-muted-foreground font-mono bg-muted/30 px-4 py-2 rounded-full border border-border/50">
                    <Clock size={16} className="text-accent" />
                    {mounted ? format(now, "MMM dd, yyyy • HH:mm:ss") : "--:--:--"}
                </div>

                <div className="flex justify-end flex-1">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300"
                        aria-label="Toggle Dark Mode"
                    >
                        {mounted ? (
                            theme === "dark" ? <Sun size={20} /> : <Moon size={20} />
                        ) : (
                            <div className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
