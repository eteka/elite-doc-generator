import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-accent" />
          <span className="font-bold text-xl text-primary">Elite Doc Generator</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/templates" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Templates
          </Link>
          <Link href="/visualizations" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Visualizations
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Button variant="accent" asChild>
            <Link href="/editor">Create Document</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
