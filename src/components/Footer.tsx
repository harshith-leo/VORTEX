"use client";

interface FooterProps {
    totalCount: number;
    completedCount: number;
    filter: "all" | "active" | "completed";
    onFilterChange: (f: "all" | "active" | "completed") => void;
    onClearCompleted: () => void;
}

export function Footer({
    totalCount,
    completedCount,
    filter,
    onFilterChange,
    onClearCompleted,
}: FooterProps) {
    if (totalCount === 0) return null;

    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <div className="mt-8 flex flex-col gap-6 w-full animate-in fade-in fill-mode-forwards">
            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div
                    className="bg-accent h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground bg-card shadow-sm border border-border p-3 rounded-2xl">
                <span className="font-medium px-2 font-mono bg-muted py-1 rounded">
                    {completedCount} / {totalCount} done ({percentage}%)
                </span>

                <div className="flex items-center gap-1 bg-muted p-1 rounded-xl">
                    {(["all", "active", "completed"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => onFilterChange(f)}
                            className={`px-4 py-1.5 rounded-lg capitalize font-medium transition-all ${filter === f
                                    ? "bg-card text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {completedCount > 0 && (
                    <button
                        onClick={onClearCompleted}
                        className="text-red-500 hover:text-red-600 hover:underline hover:bg-red-50 dark:hover:bg-red-950/30 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        Clear completed
                    </button>
                )}
            </div>
        </div>
    );
}
