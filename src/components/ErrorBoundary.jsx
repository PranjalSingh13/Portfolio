import { Component } from 'react'

/**
 * Top-level error boundary that catches React render crashes.
 * On error it clears the localStorage cache (stale data is the most common cause)
 * and shows a friendly fallback UI with a reload button.
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false, errorMessage: '' }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' }
  }

  componentDidCatch(error, info) {
    // Wipe stale localStorage so the next reload works cleanly
    try { localStorage.removeItem('pranjal_portfolio_dynamic_data') } catch {}
    console.error('Portfolio render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            background: '#060d1f',
            color: '#d6e8ff',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
            fontFamily: 'sans-serif',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: 14, color: '#7aa8d4', margin: 0, maxWidth: 420 }}>
            The portfolio encountered a rendering error (possibly stale cached data). 
            Clicking the button below will clear the cache and reload the page.
          </p>
          <button
            onClick={() => {
              try { localStorage.clear() } catch {}
              window.location.reload()
            }}
            style={{
              padding: '10px 28px',
              background: '#0284c7',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Clear Cache &amp; Reload
          </button>
          {this.state.errorMessage && (
            <p style={{ fontSize: 11, color: '#4a6a8a', margin: 0 }}>
              {this.state.errorMessage}
            </p>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
