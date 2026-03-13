"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types";
import {
    Check,
    Trash2,
    GripVertical,
    Calendar,
    Tag,
    Flag,
    Edit2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

const priorityColors = {
    low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editText.trim() && editText !== task.text) {
            onEdit(task.id, editText);
        }
        setIsEditing(false);
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.01 }}
            className={cn(
                "group relative flex items-start gap-3 p-4 bg-card border border-border rounded-2xl shadow-sm transition-all dark:shadow-none hover:shadow-md",
                isDragging ? "opacity-50 z-10 shadow-xl ring-2 ring-accent" : "",
                task.completed ? "opacity-75" : ""
            )}
        >
            <div
                {...attributes}
                {...listeners}
                className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-foreground transition-colors"
            >
                <GripVertical size={20} />
            </div>

            <button
                onClick={() => onToggle(task.id)}
                className={cn(
                    "mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-background",
                    task.completed
                        ? "bg-accent border-accent text-accent-foreground"
                        : "border-muted-foreground/30 hover:border-accent"
                )}
            >
                {task.completed && <Check size={14} strokeWidth={3} />}
            </button>

            <div className="flex-1 min-w-0 flex flex-col gap-2">
                {isEditing ? (
                    <form onSubmit={handleEditSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleEditSubmit}
                            autoFocus
                            className="flex-1 bg-transparent border-b-2 border-accent text-foreground outline-none px-1"
                        />
                    </form>
                ) : (
                    <div
                        className={cn(
                            "text-base font-medium break-words transition-colors",
                            task.completed ? "text-muted-foreground line-through" : "text-foreground"
                        )}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.text}
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={cn("px-2 py-0.5 rounded-full capitalize font-medium flex items-center gap-1", priorityColors[task.priority])}>
                        <Flag size={12} />
                        {task.priority}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize flex items-center gap-1 font-medium">
                        <Tag size={12} />
                        {task.category}
                    </span>
                    {task.dueDate && (
                        <span className={cn(
                            "px-2 py-0.5 rounded-full flex items-center gap-1 font-medium",
                            task.completed ? "bg-muted text-muted-foreground" :
                                new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                    : "bg-muted text-muted-foreground"
                        )}>
                            <Calendar size={12} />
                            {format(new Date(task.dueDate), "MMM d, yyyy")}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                    title="Edit Task"
                >
                    <Edit2 size={16} />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Task"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </motion.div>
    );
}
