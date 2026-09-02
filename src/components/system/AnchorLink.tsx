import { AnchorHTMLAttributes, forwardRef } from 'react';

type AnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** id of the target section, without the leading hash. */
  to: string;
  /** Move keyboard focus to the target as well as scrolling — used by the skip link. */
  moveFocus?: boolean;
};

/**
 * In-page navigation that can't be handled by a plain `href="#id"`: the app
 * runs on HashRouter, so writing to `location.hash` would be read as a route
 * change and drop the visitor on the 404 page. We scroll manually and leave
 * the hash alone, keeping the href for semantics, middle-click and screen
 * readers. Smoothness and the fixed-header offset come from CSS
 * (`scroll-behavior` + `scroll-padding-top`), which also means
 * `prefers-reduced-motion` is respected without a branch here.
 */
export const AnchorLink = forwardRef<HTMLAnchorElement, AnchorLinkProps>(
  ({ to, moveFocus, onClick, children, ...rest }, ref) => (
    <a
      {...rest}
      ref={ref}
      href={`#${to}`}
      onClick={(event) => {
        const target = document.getElementById(to);
        if (target && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
          event.preventDefault();
          target.scrollIntoView({ block: 'start' });
          if (moveFocus) target.focus({ preventScroll: true });
        }
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
);

AnchorLink.displayName = 'AnchorLink';
