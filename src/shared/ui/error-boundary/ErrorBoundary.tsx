"use client";

import { getErrorMessageConfig } from "@/shared/libs";
import { useToastStore } from "@/shared/store";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showToast?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);

    if (this.props.showToast !== false) {
      const showToast = useToastStore.getState().showToast;
      const errorConfig = getErrorMessageConfig(error);

      import("@/shared/ui/icons/common/RefreshIcon").then(({ RefreshIcon }) => {
        showToast(errorConfig.message, "ERROR", {
          duration: 5000,
          action: {
            label: (
              <span className="flex items-center gap-1.5">
                <RefreshIcon className="w-3.5 h-3.5" />
                {errorConfig.action}
              </span>
            ),
            onClick: this.reset,
          },
        });
      });
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return null;
    }

    return this.props.children;
  }
}
