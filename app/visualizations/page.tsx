import { Navbar } from "@/components/navbar";
import { PremiumBarChart } from "@/components/charts/premium-bar-chart";
import { PremiumLineChart } from "@/components/charts/premium-line-chart";
import { PremiumPieChart } from "@/components/charts/premium-pie-chart";
import { WaterfallChart } from "@/components/charts/waterfall-chart";
import { Matrix2x2 } from "@/components/diagrams/matrix-2x2";
import { ProcessFlow } from "@/components/diagrams/process-flow";
import { Timeline } from "@/components/diagrams/timeline";
import { IconStats } from "@/components/diagrams/icon-stats";
import { TrendingUp, Users, DollarSign, Target, Zap, Rocket, CheckCircle2, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VisualizationsPage() {
  // Sample data
  const barData = [
    { name: "Product A", value: 4000 },
    { name: "Product B", value: 3000 },
    { name: "Product C", value: 6000 },
    { name: "Product D", value: 8000 },
  ];

  const lineData = [
    { name: "Jan", revenue: 4000, profit: 2400 },
    { name: "Feb", revenue: 3000, profit: 1398 },
    { name: "Mar", revenue: 6000, profit: 4800 },
    { name: "Apr", revenue: 8000, profit: 6800 },
    { name: "May", revenue: 7000, profit: 5900 },
    { name: "Jun", revenue: 9000, profit: 7800 },
  ];

  const pieData = [
    { name: "North America", value: 400 },
    { name: "Europe", value: 300 },
    { name: "Asia Pacific", value: 300 },
    { name: "Latin America", value: 200 },
  ];

  const waterfallData = [
    { name: "Starting Revenue", value: 10000, isTotal: true },
    { name: "New Sales", value: 3000 },
    { name: "Upsells", value: 1500 },
    { name: "Churn", value: -2000 },
    { name: "Discounts", value: -500 },
    { name: "Ending Revenue", value: 12000, isTotal: true },
  ];

  const processSteps = [
    { title: "Analysis", description: "Assess current state", icon: <BarChart3 size={20} /> },
    { title: "Design", description: "Create solution", icon: <Target size={20} /> },
    { title: "Implementation", description: "Execute plan", icon: <Rocket size={20} /> },
    { title: "Optimization", description: "Refine & improve", icon: <Zap size={20} /> },
  ];

  const timelineEvents = [
    { date: "Q1 2024", title: "Project Kickoff", description: "Initial planning and team formation", status: "completed" as const },
    { date: "Q2 2024", title: "Development Phase", description: "Core feature implementation", status: "current" as const },
    { date: "Q3 2024", title: "Testing & QA", description: "Quality assurance and bug fixes", status: "upcoming" as const },
    { date: "Q4 2024", title: "Launch", description: "Production deployment", status: "upcoming" as const },
  ];

  const stats = [
    { icon: TrendingUp, value: "$2.4M", label: "Revenue Growth", trend: { value: "+23%", isPositive: true } },
    { icon: Users, value: "15.2K", label: "Active Users", trend: { value: "+12%", isPositive: true } },
    { icon: DollarSign, value: "$450K", label: "Monthly ARR", trend: { value: "+8%", isPositive: true } },
    { icon: Target, value: "94%", label: "Goal Achievement", trend: { value: "+5%", isPositive: true } },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Premium Visualizations</h1>
          <p className="text-muted-foreground">
            Professional charts and diagrams that look like they came from a $10,000 report
          </p>
        </div>

        <div className="space-y-12">
          {/* Charts Section */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-6">Charts</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bar Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <PremiumBarChart
                    data={barData}
                    templateId="strategic-consulting"
                    title="Product Performance"
                    height={300}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Line Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <PremiumLineChart
                    data={lineData}
                    templateId="investment-banking"
                    title="Revenue & Profit Trends"
                    dataKeys={["revenue", "profit"]}
                    height={300}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pie Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <PremiumPieChart
                    data={pieData}
                    templateId="global-policy"
                    title="Market Distribution"
                    height={300}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Waterfall Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <WaterfallChart
                    data={waterfallData}
                    templateId="investment-banking"
                    title="Revenue Bridge Analysis"
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Diagrams Section */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-6">Diagrams</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">2x2 Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <Matrix2x2
                    templateId="strategic-consulting"
                    title="Strategic Priority Matrix"
                    xAxisLabel="Effort Required"
                    yAxisLabel="Business Impact"
                    quadrants={{
                      topLeft: {
                        label: "Quick Wins",
                        description: "High impact, low effort initiatives"
                      },
                      topRight: {
                        label: "Major Projects",
                        description: "High impact, high effort strategic initiatives"
                      },
                      bottomLeft: {
                        label: "Fill-ins",
                        description: "Low impact, low effort tasks"
                      },
                      bottomRight: {
                        label: "Time Sinks",
                        description: "Low impact, high effort - avoid these"
                      }
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Process Flow - Chevron Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProcessFlow
                    templateId="strategic-consulting"
                    title="Implementation Roadmap"
                    steps={processSteps}
                    variant="chevron"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Process Flow - Arrow Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProcessFlow
                    templateId="global-policy"
                    title="Policy Development Process"
                    steps={processSteps}
                    variant="arrow"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timeline - Vertical</CardTitle>
                </CardHeader>
                <CardContent>
                  <Timeline
                    templateId="executive-briefing"
                    title="Project Timeline"
                    events={timelineEvents}
                    variant="vertical"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timeline - Horizontal</CardTitle>
                </CardHeader>
                <CardContent>
                  <Timeline
                    templateId="international-development"
                    title="Implementation Phases"
                    events={timelineEvents}
                    variant="horizontal"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Icon-Based Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <IconStats
                    templateId="strategic-consulting"
                    title="Key Performance Indicators"
                    stats={stats}
                    columns={4}
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}