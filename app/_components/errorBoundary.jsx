import React from 'react';
import { useRouter } from 'next/router';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.hasError && !prevState.hasError) {
      this.redirectToHome();
    }
  }

  redirectToHome = () => {
    // You can use window.location if you want to navigate immediately
    window.location.href = 'http://localhost:3000';  // replace with desired URL
  }

  render() {
    if (this.state.hasError) {
      return null; // Or return some fallback UI if needed
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
