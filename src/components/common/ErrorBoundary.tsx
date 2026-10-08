import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-studio-black text-canvas-light p-6 text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-architectural">SANA ARCHITECTS</h2>
            <p className="text-xs text-canvas-muted">Unable to display this view. Tap to reload.</p>
            <button
              onClick={() => {
                try {
                  sessionStorage.clear();
                } catch {
                  // Ignore
                }
                window.location.reload();
              }}
              className="px-4 py-2 bg-white text-studio-black text-xs uppercase tracking-wider font-semibold rounded shadow-md"
            >
              Reload Studio Showcase
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
