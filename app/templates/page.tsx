import Link from "next/link";
import { FileText, Briefcase, Scale, TrendingUp, BookOpen, Users, Globe, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { getAllCategories, templates } from "@/lib/templates";

const iconMap = {
  briefcase: Briefcase,
  scale: Scale,
  "trending-up": TrendingUp,
  "book-open": BookOpen,
  users: Users,
  globe: Globe,
};

export default function Templates() {
  const templateCategories = getAllCategories();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Premium Templates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated collection of professionally designed templates. 
            Each template is crafted by experts and optimized for impact.
          </p>
        </div>

        {/* Template Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templateCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || FileText;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-accent">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">
                      {category.name}
                    </CardTitle>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm ml-1">Premium</span>
                    </div>
                  </div>
                  <CardDescription className="text-base mb-4">
                    {category.description}
                  </CardDescription>
                  <div className="text-sm text-muted-foreground mb-4">
                    {category.templates.length} professional templates
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {category.templates.slice(0, 4).map((template, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Zap className="h-3 w-3 mr-2 text-accent" />
                        {template.name}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={`/editor?category=${category.id}`}>Browse Templates</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Templates Section */}
        <div className="bg-white rounded-xl p-8 border-2">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Featured Professional Templates</h2>
            <p className="text-muted-foreground">Premium templates designed by industry experts</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.slice(0, 4).map((template, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: template.colorScheme.primary }}
                  >
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    {template.sections.length} sections • {template.layout} layout
                  </div>
                  <Button size="sm" variant="accent" className="w-full" asChild>
                    <Link href={`/editor?template=${template.id}`}>Use Template</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-primary to-slate-700 text-white border-0 max-w-2xl mx-auto">
            <CardHeader className="py-8">
              <CardTitle className="text-2xl mb-4 text-white">Can't Find What You Need?</CardTitle>
              <CardDescription className="text-slate-200 mb-6">
                Request a custom template or start from scratch with our powerful editor
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" asChild>
                  <Link href="/editor">Start From Scratch</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Request Template
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}