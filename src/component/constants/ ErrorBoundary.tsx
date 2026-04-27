import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center h-screen bg-[#E6E0D3] gap-4">
            <p className="text-[#20110A] text-h-20b">문제가 발생했어요</p>
            <p className="text-[#20110A]/60 text-c-12m">
              잠시 후 다시 시도해주세요
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 px-6 py-3 bg-[#20110A] text-white rounded-full text-b-16b"
            >
              다시 시도
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
