import Link from "next/link";
import { FileText, Zap, Shield, Sparkles, Layout, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional documents in seconds with our optimized engine"
    },
    {
      icon: Layout,
      title: "Premium Templates",
      description: "Access a curated collection of professionally designed templates"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your documents are encrypted and stored securely"
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Smart suggestions and auto-formatting for perfect documents"
    },
    {
      icon: Download,
      title: "Export Anywhere",
      description: "Download in PDF, DOCX, or share directly from the platform"
    },
    {
      icon: FileText,
      title: "Version Control",
      description: "Track changes and maintain document history effortlessly"
    }
  ];

  const templates = [
    { name: "Business Proposals", count: 12, color: "bg-blue-500" },
    { name: "Legal Contracts", count: 8, color: "bg-purple-500" },
    { name: "Marketing Reports", count: 15, color: "bg-pink-500" },
    { name: "Technical Docs", count: 10, color: "bg-green-500" },
    { name: "Financial Reports", count: 9, color: "bg-yellow-500" },
    { name: "HR Documents", count: 11, color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
            Create Documents
            <span className="block text-accent mt-2">That Command Attention</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional document generation powered by premium templates and intelligent automation.
            Elevate your business communications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="accent" asChild className="text-lg px-8">
              <Link href="/editor">Start Creating</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground">Powerful features for professional document creation</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Template Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Premium Templates</h2>
          <p className="text-lg text-muted-foreground">Professionally designed for every business need</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className={`w-full h-32 ${template.color} rounded-md mb-4 group-hover:scale-105 transition-transform`} />
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.count} templates available</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/templates">View All Templates</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-slate-700 text-white border-0 max-w-4xl mx-auto">
          <CardHeader className="text-center py-12">
            <CardTitle className="text-4xl mb-4 text-white">Ready to Get Started?</CardTitle>
            <CardDescription className="text-lg text-slate-200 mb-8">
              Join thousands of professionals creating exceptional documents
            </CardDescription>
            <Button size="lg" variant="accent" asChild className="mx-auto">
              <Link href="/dashboard">Launch Dashboard</Link>
            </Button>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
