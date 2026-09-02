import { HashRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

/**
 * HashRouter is deliberate: GitHub Pages serves static files only, so hash
 * routing keeps deep links working without a server-side rewrite rule.
 */
const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>
);

export default App;
