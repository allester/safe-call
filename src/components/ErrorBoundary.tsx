import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

/**
 * Catches React render errors so the app doesn't crash (e.g. on visionOS).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('App error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-screen bg-elevenlabs-dark text-white p-6 flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h1>
          <p className="text-sm text-elevenlabs-muted max-w-md text-center mb-4">
            {this.state.error.message}
          </p>
          <p className="text-xs text-elevenlabs-muted max-w-md text-center mb-6">
            On visionOS, voice may be limited. Try on a desktop browser for full features.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 rounded-lg bg-elevenlabs-accent hover:bg-indigo-600 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
