import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { inject } from '@vercel/analytics';
 
inject();
createRoot(document.getElementById("root")!).render(<App />);
