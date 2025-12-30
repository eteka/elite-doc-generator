import { Header, Footer } from '@/components/layout';
import { TemplateCard } from '@/components/templates';
import { documentTemplates } from '@/lib/templates';
import { FileText, Sparkles, Download, BarChart } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-elite-navy via-slate-900 to-elite-charcoal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
                <Sparkles className="h-4 w-4 text-elite-gold" />
                <span>AI-Powered Document Generation</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Create Consulting-Grade
                <span className="block text-elite-gold">Documents in Minutes</span>
              </h1>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Elite Doc Generator helps you create professional reports, presentations,
                and policy documents with AI-powered content generation and premium
                formatting. Trusted by consultants and executives worldwide.
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span>5 Premium Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span>AI Content Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <span>Data Visualizations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Download className="h-5 w-5" />
                  </div>
                  <span>PDF, DOCX, PPTX Export</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Choose Your Template
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Start with a professionally designed template and customize it to your needs.
                Each template includes AI-powered section prompts for faster content creation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why Elite Doc Generator?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-elite">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  AI-Powered Writing
                </h3>
                <p className="text-slate-600">
                  Generate professional content with GPT-4. Each section includes
                  tailored prompts for consulting-quality output.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elite">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Premium Templates
                </h3>
                <p className="text-slate-600">
                  McKinsey-style reports, World Bank policy documents, and executive
                  presentations with professional formatting.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-elite">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 mb-4">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Multi-Format Export
                </h3>
                <p className="text-slate-600">
                  Export to PDF, Word, or PowerPoint with consistent premium styling
                  across all formats.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
