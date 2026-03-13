"use client";

import { Navbar } from "@/components/Navbar";
import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { Hero3D } from "@/components/Hero3D";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const {
    filteredTasks,
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
    totalCount,
    completedLog,
  } = useTasks();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-8 flex flex-col gap-6">
        <header className="mb-2 animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left md:max-w-[50%]">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">My Tasks</h2>
            <p className="text-muted-foreground">
              What&apos;s on your agenda today? Plan and manage your work efficiently.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <Hero3D />
          </div>
        </header>

        <section className="animate-in fade-in slide-in-from-top-6 duration-700">
          <TaskInput onAdd={addTask} />
        </section>

        <section className="mt-4 flex-1">
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
            onReorder={reorderTasks}
          />
        </section>

        <Footer
          totalCount={totalCount}
          completedCount={completedCount}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />

        <section className="mt-8 border-t border-border pt-8">
          <Analytics tasks={filteredTasks} completedLog={completedLog} />
        </section>
      </main>
    </div>
  );
}
