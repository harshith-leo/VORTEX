"use client";

import { useState, useEffect } from "react";
import { Task, Priority, Category } from "@/types";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";

type Filter = "all" | "active" | "completed";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [completedLog, setCompletedLog] = useState<{ id: string, timestamp: number }[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filter, setFilter] = useState<Filter>("all");

    useEffect(() => {
        const saved = localStorage.getItem("todo-app-tasks");
        const savedLog = localStorage.getItem("todo-app-analytics");
        if (saved) {
            try { setTasks(JSON.parse(saved)); } catch { }
        }
        if (savedLog) {
            try { setCompletedLog(JSON.parse(savedLog)); } catch { }
        }
        setIsLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("todo-app-tasks", JSON.stringify(tasks));
            localStorage.setItem("todo-app-analytics", JSON.stringify(completedLog));
        }
    }, [tasks, completedLog, isLoaded]);

    const addTask = (
        text: string,
        priority: Priority = "medium",
        category: Category = "other",
        dueDate: number | null = null
    ) => {
        if (!text.trim()) return;

        const newTask: Task = {
            id: nanoid(),
            text: text.trim(),
            completed: false,
            createdAt: Date.now(),
            priority,
            category,
            dueDate,
        };

        setTasks((prev) => [newTask, ...prev]);
        toast.success("Task added!");
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((t) => {
                if (t.id === id) {
                    const isCompleted = !t.completed;
                    const timestamp = Date.now();

                    if (isCompleted) {
                        setCompletedLog((log) => [...log, { id: t.id, timestamp }]);
                    } else {
                        setCompletedLog((log) => log.filter(entry => entry.id !== id));
                    }

                    return { ...t, completed: isCompleted, completedAt: isCompleted ? timestamp : null };
                }
                return t;
            })
        );
    };

    const editTask = (id: string, text: string) => {
        if (!text.trim()) return;
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t)));
        toast.success("Task updated");
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setCompletedLog((log) => log.filter(entry => entry.id !== id));
        toast.error("Task removed");
    };

    const clearCompleted = () => {
        setTasks((prev) => prev.filter((t) => !t.completed));
        // Keep in completedLog if you want analytics to persist after clearing tasks?
        // Let's keep them in analytics so the graph isn't cleared when cleaning up UI UI.
        toast.error("Completed tasks cleared");
    };

    const reorderTasks = (newTasks: Task[]) => {
        setTasks(newTasks);
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const completedCount = tasks.filter((t) => t.completed).length;

    return {
        tasks,
        filteredTasks,
        completedLog,
        isLoaded,
        filter,
        setFilter,
        addTask,
        toggleTask,
        editTask,
        deleteTask,
        clearCompleted,
        reorderTasks,
        completedCount,
        totalCount: tasks.length,
    };
}
