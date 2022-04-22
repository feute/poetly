import { Component } from 'react';
import type { ReactNode } from 'react';

type TPoemsErrorBoundaryProps = {
  children: ReactNode;
};

type TPoemsErrorBoundaryState = {
  hasError: boolean;
};

export class PoemsErrorBoundary extends Component<
  TPoemsErrorBoundaryProps,
  TPoemsErrorBoundaryState
> {
  constructor(props: TPoemsErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI.
      return (
        <h1>
          Something went wrong.{' '}
          <button type="button" onClick={() => this.setState({ hasError: false })}>
            Retry
          </button>
        </h1>
      );
    }

    return this.props.children;
  }
}
