import React from 'react';

interface ErrorBoundaryProps {
    fallback?: React.ReactNode;
    children?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error | null;
}

export default class FormErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <span>An error occured in the form!</span>;
        }
        return this.props.children ?? null;
    }
}
