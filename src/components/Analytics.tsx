"use client";

import { useMemo } from "react";
import { Task } from "@/types";
import { format, subDays, isSameDay } from "date-fns";
import {
    RadialBarChart,
    RadialBar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface AnalyticsProps {
    tasks: Task[];
    completedLog: { id: string; timestamp: number }[];
}

export function Analytics({ tasks, completedLog }: AnalyticsProps) {
    // 1. Daily Data (Concentric Circles)
    const dailyData = useMemo(() => {
        const today = new Date();
        const completedToday = completedLog.filter((l) =>
            isSameDay(new Date(l.timestamp), today)
        ).length;

        const remaining = tasks.filter((t) => !t.completed).length;

        return [
            {
                name: "Remaining",
                value: remaining,
                fill: "var(--muted)",
            },
            {
                name: "Completed",
                value: completedToday,
                fill: "var(--accent)",
            },
        ];
    }, [tasks, completedLog]);

    // 2. Weekly Data (Line Graph)
    const weeklyData = useMemo(() => {
        const last7Days = Array.from({ length: 7 }).map((_, i) =>
            subDays(new Date(), 6 - i)
        );

        return last7Days.map((date) => {
            const count = completedLog.filter((l) =>
                isSameDay(new Date(l.timestamp), date)
            ).length;
            return {
                date: format(date, "EEE"),
                completed: count,
            };
        });
    }, [completedLog]);

    // 3. Monthly Data (Line Graph)
    const monthlyData = useMemo(() => {
        const last30Days = Array.from({ length: 30 }).map((_, i) =>
            subDays(new Date(), 29 - i)
        );

        return last30Days.map((date) => {
            const count = completedLog.filter((l) =>
                isSameDay(new Date(l.timestamp), date)
            ).length;
            return {
                date: format(date, "MMM dd"),
                completed: count,
            };
        });
    }, [completedLog]);

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Daily Concentric Circles */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Daily Activity</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="100%"
                                barSize={20}
                                data={dailyData}
                                startAngle={90}
                                endAngle={-270}
                            >
                                <RadialBar
                                    background={{ fill: "var(--muted)" }}
                                    dataKey="value"
                                    cornerRadius={10}
                                />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "var(--border)",
                                        borderRadius: "0.5rem",
                                    }}
                                />
                                <Legend
                                    iconSize={10}
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="center"
                                    wrapperStyle={{ paddingTop: "20px" }}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Weekly Line Graph */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="var(--muted-foreground)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="var(--muted-foreground)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dx={-10}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "var(--border)",
                                        borderRadius: "0.5rem",
                                    }}
                                    itemStyle={{ color: "var(--foreground)" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="completed"
                                    stroke="var(--accent)"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "var(--accent)" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Monthly Line Graph */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="var(--muted-foreground)"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                                minTickGap={20}
                            />
                            <YAxis
                                stroke="var(--muted-foreground)"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                dx={-10}
                                allowDecimals={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--card)",
                                    borderColor: "var(--border)",
                                    borderRadius: "0.5rem",
                                }}
                                itemStyle={{ color: "var(--foreground)" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="completed"
                                stroke="var(--accent)"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6, fill: "var(--accent)" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
