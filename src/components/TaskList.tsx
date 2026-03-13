"use client";

import { useMemo, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Task } from "@/types";
import { TaskItem } from "./TaskItem";
import { AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
    onReorder: (tasks: Task[]) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onEdit, onReorder }: TaskListProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const activeTask = useMemo(
        () => tasks.find((t) => t.id === activeId),
        [activeId, tasks]
    );

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = tasks.findIndex((t) => t.id === active.id);
            const newIndex = tasks.findIndex((t) => t.id === over.id);

            onReorder(arrayMove(tasks, oldIndex, newIndex));
        }
    };

    const dropAnimationConfig = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.4",
                },
            },
        }),
    };

    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CheckCircle size={64} className="mb-4 opacity-50 text-accent" />
                <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
                <p>You have no tasks here. Enjoy your day!</p>
            </div>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3 mt-6">
                    <AnimatePresence mode="popLayout">
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </SortableContext>

            <DragOverlay dropAnimation={dropAnimationConfig}>
                {activeTask ? (
                    <TaskItem
                        task={activeTask}
                        onToggle={() => { }}
                        onDelete={() => { }}
                        onEdit={() => { }}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
