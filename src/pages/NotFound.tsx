import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <main className="flex min-h-[100svh] items-center">
      <div className="shell">
        <p className="meta text-flare">Error 404</p>
        <h1 className="masthead mt-6 uppercase">
          Not
          <br />
          Found<span className="text-flare">.</span>
        </h1>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-rule pt-6">
          <p className="meta-sm">Requested path — {location.pathname}</p>
          <a href="#/" className="action action--flare" data-cursor="link">
            Return home <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
