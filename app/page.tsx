'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, SendIcon, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoadingSteps } from '@/components/LoadingSteps';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [email, setEmail] = useState('');
  const [researchResult, setResearchResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !email) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both a topic and email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate research report');
      }

      setResearchResult(data.result);

      toast({
        title: 'Research Complete',
        description: 'Your research report has been generated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate research report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNIDAgMTAgTCAxMCAwIEwgMjAgMTAgTCAxMCAyMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIGZpbGw9Im5vbmUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <BrainCircuit className="h-16 w-16 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
             InsightExpress
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Provide a topic of interest, and our intelligent agents will
              search the internet to generate a comprehensive custom report
              tailored just for you.
            </p>
          </div>

          <Card className="bg-black/50 backdrop-blur-xl border-purple-500/20">
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Research Topic
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="topic"
                      placeholder="Enter your topic of interest..."
                      className="pl-10 bg-black/30 border-purple-500/30 text-white placeholder:text-gray-500"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <SendIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Where should we send the report?"
                      className="pl-10 bg-black/30 border-purple-500/30 text-white placeholder:text-gray-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading
                  ? 'Generating Newletter...'
                  : 'Generate Newletter'}
              </Button>

              {isLoading && (
                <div className="mt-6">
                  <LoadingSteps />
                </div>
              )}
            </form>
          </Card>

          {researchResult && (
            <Card className="mt-8 bg-white border-gray-200">
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200 flex items-center gap-2">
                  <SearchIcon className="h-5 w-5 text-purple-600" />
                  Research Results
                </h2>
                <div className="prose max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      img: ({ node, ...props }) => (
                        <img
                          {...props}
                          className="rounded-lg shadow-lg my-8 w-full object-cover"
                          loading="lazy"
                        />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                      h1: ({ node, ...props }) => (
                        <div className="mt-12 mb-8">
                          <h1
                            {...props}
                            className="text-2xl font-bold text-gray-900 mb-6"
                          />
                          <hr className="border-t-2 border-gray-100 my-8" />
                        </div>
                      ),
                      h2: ({ node, ...props }) => (
                        <div className="mt-10 mb-6">
                          <h2
                            {...props}
                            className="text-xl font-semibold text-gray-900"
                          />
                          <hr className="border-t border-gray-100 my-6" />
                        </div>
                      ),
                      p: ({ node, ...props }) => (
                        <p {...props} className="text-gray-700 mb-6 leading-relaxed text-lg" />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul {...props} className="my-6 space-y-3" />
                      ),
                      li: ({ node, ...props }) => (
                        <li {...props} className="text-gray-700 leading-relaxed" />
                      ),
                      hr: ({ node, ...props }) => (
                        <hr {...props} className="my-12 border-t-2 border-gray-100" />
                      ),
                    }}
                  >
                    {researchResult}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
