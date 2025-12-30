import Link from "next/link";
import { Plus, FileText, Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

export default function Dashboard() {
  const recentDocuments = [
    {
      id: 1,
      title: "Q4 Business Proposal",
      type: "Business Proposal",
      lastEdited: "2 hours ago",
      status: "Draft"
    },
    {
      id: 2,
      title: "Marketing Strategy 2024",
      type: "Marketing Report",
      lastEdited: "1 day ago",
      status: "Complete"
    },
    {
      id: 3,
      title: "Client Service Agreement",
      type: "Legal Contract",
      lastEdited: "3 days ago",
      status: "Review"
    },
    {
      id: 4,
      title: "Technical Documentation",
      type: "Technical Docs",
      lastEdited: "5 days ago",
      status: "Complete"
    },
    {
      id: 5,
      title: "Financial Report Q3",
      type: "Financial Report",
      lastEdited: "1 week ago",
      status: "Complete"
    },
    {
      id: 6,
      title: "Employee Handbook",
      type: "HR Document",
      lastEdited: "2 weeks ago",
      status: "Draft"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage and create your documents</p>
          </div>
          <Button size="lg" variant="accent" asChild className="mt-4 md:mt-0">
            <Link href="/editor">
              <Plus className="mr-2 h-5 w-5" />
              Create New Document
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground mt-1">+3 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">8</div>
              <p className="text-xs text-muted-foreground mt-1">Active drafts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">16</div>
              <p className="text-xs text-muted-foreground mt-1">Ready to export</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Documents */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Recent Documents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    {doc.title}
                  </CardTitle>
                  <CardDescription>{doc.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{doc.lastEdited}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'Complete' ? 'bg-green-100 text-green-700' :
                      doc.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
