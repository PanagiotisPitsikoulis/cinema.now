import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { PageProps } from "@/types";
import React from "react";
import { SidebarComposed } from "@/Components/lib/composed/SidebarComposed";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/lib/ui/chart";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Label,
    Line,
    LineChart,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    XAxis,
} from "recharts";
import { generateSidebarConfig } from "@/Components/lib/config/dashboard/DashboardSidebarConfig";
import { generateDashboardHomePageProps } from "@/Components/lib/config/dashboard/DashboardHomePageProps";
import { DashboardHomeData } from "@/types/dashboard-types";
import { PlayIcon, TagIcon, UsersIcon } from "lucide-react";
import { Head } from "@inertiajs/react";

/**
 * Display the Dashboard home page.
 * @param auth - The authenticated user object.
 * @returns JSX.Element
 */
export default function DashboardHome({ auth }: PageProps<DashboardHomeData>) {
    // Generate the sidebar configuration.
    const sidebarProps = generateSidebarConfig(auth.user, "Home");

    // Generate the chart configurations and data.
    const {
        chartData1,
        chartConfig1,
        chartData2,
        chartConfig2,
        chartData3,
        chartConfig3,
    } = generateDashboardHomePageProps();

    return (
        <>
            <SidebarComposed {...sidebarProps}>
                {/* Page Title */}
                <Head title="Admin Dashboard Analytics" />
                <section className={"px-4 lg:px-8 pb-10"}>
                    <div className={"flex flex-col gap-4"}>
                        <div
                            className={"flex flex-col gap-4 lg:flex-row w-full"}
                        >
                            <Card shadow={"sm"} className={"w-full"}>
                                <CardHeader className="flex gap-3">
                                    <PlayIcon />
                                    <div className="flex flex-col">
                                        <p className="text-md">
                                            Movies & Display Times
                                        </p>
                                        <p className="text-small text-default-500">
                                            View analytics about the movies and
                                            their corresponding display times.
                                        </p>
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody className={"min-h-[300px]"}>
                                    <ChartContainer
                                        config={chartConfig1}
                                        className={"my-auto"}
                                    >
                                        <AreaChart
                                            accessibilityLayer
                                            data={chartData1}
                                            margin={{
                                                left: 12,
                                                right: 12,
                                            }}
                                        >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) =>
                                                    value.slice(0, 3)
                                                }
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={
                                                    <ChartTooltipContent indicator="dot" />
                                                }
                                            />
                                            <Area
                                                dataKey="mobile"
                                                type="natural"
                                                fill="var(--color-mobile)"
                                                fillOpacity={0.4}
                                                stroke="var(--color-mobile)"
                                                stackId="a"
                                            />
                                            <Area
                                                dataKey="desktop"
                                                type="natural"
                                                fill="var(--color-desktop)"
                                                fillOpacity={0.4}
                                                stroke="var(--color-desktop)"
                                                stackId="a"
                                            />
                                        </AreaChart>
                                    </ChartContainer>
                                </CardBody>
                            </Card>
                            <Card shadow={"sm"} className={"w-full"}>
                                <CardHeader className="flex gap-3">
                                    <TagIcon />
                                    <div className="flex flex-col">
                                        <p className="text-md">Reservations</p>
                                        <p className="text-small text-default-500">
                                            Total reservations made by users.
                                        </p>
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody className={"min-h-[300px]"}>
                                    <ChartContainer
                                        config={chartConfig2}
                                        className="aspect-square max-h-[250px] my-auto"
                                    >
                                        <RadialBarChart
                                            data={chartData2}
                                            endAngle={100}
                                            innerRadius={80}
                                            outerRadius={140}
                                        >
                                            <PolarGrid
                                                gridType="circle"
                                                radialLines={false}
                                                stroke="none"
                                                className="first:fill-content2 last:fill-background"
                                                polarRadius={[86, 74]}
                                            />
                                            <RadialBar
                                                dataKey="visitors"
                                                background
                                            />
                                            <PolarRadiusAxis
                                                tick={false}
                                                tickLine={false}
                                                axisLine={false}
                                            >
                                                <Label
                                                    content={({ viewBox }) => {
                                                        if (
                                                            viewBox &&
                                                            "cx" in viewBox &&
                                                            "cy" in viewBox
                                                        ) {
                                                            return (
                                                                <text
                                                                    x={
                                                                        viewBox.cx
                                                                    }
                                                                    y={
                                                                        viewBox.cy
                                                                    }
                                                                    textAnchor="middle"
                                                                    dominantBaseline="middle"
                                                                >
                                                                    <tspan
                                                                        x={
                                                                            viewBox.cx
                                                                        }
                                                                        y={
                                                                            viewBox.cy
                                                                        }
                                                                        className="fill-foreground text-4xl font-bold"
                                                                    >
                                                                        {chartData2[0].visitors.toLocaleString()}
                                                                    </tspan>
                                                                    <tspan
                                                                        x={
                                                                            viewBox.cx
                                                                        }
                                                                        y={
                                                                            (viewBox.cy ||
                                                                                0) +
                                                                            24
                                                                        }
                                                                        className="fill-muted-foreground"
                                                                    >
                                                                        Visitors
                                                                    </tspan>
                                                                </text>
                                                            );
                                                        }
                                                    }}
                                                />
                                            </PolarRadiusAxis>
                                        </RadialBarChart>
                                    </ChartContainer>
                                </CardBody>
                            </Card>
                        </div>
                        <Card shadow={"sm"} className={"w-full"}>
                            <CardHeader className="flex gap-3">
                                <UsersIcon />
                                <div className="flex flex-col">
                                    <p className="text-md">
                                        Users and Sessions
                                    </p>
                                    <p className="text-small text-default-500">
                                        Total number of users per day, and the
                                        sessions they have created.
                                    </p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className={"min-h-[300px]"}>
                                <ChartContainer
                                    config={chartConfig3}
                                    className="aspect-auto h-[250px] w-full"
                                >
                                    <LineChart
                                        accessibilityLayer
                                        data={chartData3}
                                        margin={{
                                            left: 12,
                                            right: 12,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            minTickGap={32}
                                            tickFormatter={(value) => {
                                                const date = new Date(value);
                                                return date.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                );
                                            }}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    className="w-[150px]"
                                                    nameKey="views"
                                                    labelFormatter={(value) => {
                                                        return new Date(
                                                            value
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }
                                                        );
                                                    }}
                                                />
                                            }
                                        />
                                        {/* Line for Desktop */}
                                        <Line
                                            dataKey="desktop"
                                            name="Desktop Views"
                                            type="monotone"
                                            stroke="var(--color-desktop)"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                        {/* Line for Mobile */}
                                        <Line
                                            dataKey="mobile"
                                            name="Mobile Views"
                                            type="monotone"
                                            stroke="var(--color-mobile)"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </CardBody>
                        </Card>
                    </div>
                </section>
            </SidebarComposed>
        </>
    );
}
