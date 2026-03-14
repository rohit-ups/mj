import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

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
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="brutalist-border bg-white p-10 max-w-xl w-full brutalist-shadow space-y-6">
            <div className="flex items-center gap-4 text-red-600">
              <AlertTriangle className="w-10 h-10" />
              <h1 className="font-display text-4xl uppercase font-black tracking-tighter">System Failure</h1>
            </div>
            
            <div className="bg-red-50 border-2 border-red-200 p-4 font-mono text-xs text-red-800 overflow-auto max-h-32">
              {this.state.error?.message || "An unknown execution error occurred."}
            </div>

            <p className="font-mono text-sm uppercase opacity-60">
              The application encountered a critical exception. Pipeline terminated.
            </p>

            <button 
              onClick={this.handleReset}
              className="w-full brutalist-button bg-black text-white flex items-center justify-center gap-3 py-4"
            >
              <RefreshCcw className="w-5 h-5" />
              Re-initialize Session
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const LoadingFallback = () => (
  <div className="p-8 space-y-8 animate-pulse">
    <div className="h-12 w-1/3 bg-black/10 brutalist-border" />
    <div className="h-4 w-1/2 bg-black/5 brutalist-border" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-48 bg-black/5 brutalist-border" />
      ))}
    </div>
  </div>
);
