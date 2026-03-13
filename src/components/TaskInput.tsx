"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Priority, Category } from "@/types";

interface TaskInputProps {
    onAdd: (text: string, priority: Priority, category: Category, dueDate: number | null) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [category, setCategory] = useState<Category>("personal");
    const [dueDate, setDueDate] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        onAdd(
            text,
            priority,
            category,
            dueDate ? new Date(dueDate).getTime() : null
        );
        setText("");
        setDueDate("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-card shadow-sm border border-border rounded-2xl p-4 transition-all focus-within:ring-2 focus-within:ring-accent/40"
        >
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground outline-none text-lg min-w-0"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <Plus size={20} />
                    <span>Add Task</span>
                </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-sm pt-3 border-t border-border/50">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="bg-muted text-muted-foreground border-none rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-muted/80 transition-colors"
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="bg-muted text-muted-foreground border-none rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-muted/80 transition-colors capitalize"
                >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                </select>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-muted text-muted-foreground border-none rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-muted/80 transition-colors min-w-[140px]"
                />
            </div>
        </form>
    );
}
