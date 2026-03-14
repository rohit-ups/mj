import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Web App error:", error, errorInfo);
  }

  private handleReset = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#f0f0f0]">
          <div className="brutalist-card p-12 max-w-2xl w-full bg-white space-y-8">
            <div className="flex items-center gap-6 text-mj-accent">
              <AlertCircle className="w-16 h-16" />
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">Sequence <br/>Interrupted</h1>
            </div>
            
            <p className="text-xl font-bold uppercase opacity-80 border-l-4 border-black pl-6">
              A critical error has occurred in the Mambo Jambo protocol. Navigation failed.
            </p>

            <div className="bg-mj-black text-white p-6 font-mono text-xs overflow-auto max-h-40 brutalist-border">
              {this.state.error?.stack || this.state.error?.message}
            </div>

            <button 
              onClick={this.handleReset}
              className="w-full brutalist-button bg-mj-accent text-white flex items-center justify-center gap-4 py-6 text-2xl"
            >
              <RefreshCw className="w-8 h-8" />
              Return to Base
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const WebLoadingFallback = () => (
  <div className="min-h-screen p-12 space-y-12 animate-pulse bg-[#f0f0f0]">
    <div className="h-20 w-2/3 bg-black/10 brutalist-border" />
    <div className="h-8 w-1/3 bg-black/5 brutalist-border" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
      {[1, 2].map(i => (
        <div key={i} className="h-96 bg-black/5 brutalist-border" />
      ))}
    </div>
  </div>
);
