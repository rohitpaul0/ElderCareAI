import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

console.log('Main.tsx: attempting to render App...');

const rootInfo = document.getElementById('root');

if (rootInfo) {
  createRoot(rootInfo).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
} else {
  alert('CRITICAL ERROR: Root element not found');
}
