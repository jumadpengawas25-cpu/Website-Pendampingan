import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  Children,
  cloneElement,
} from "react";

const LocationContext = createContext("/");
const NavigateContext = createContext(() => {});

export function matchRoute(routePath, locationPath) {
  const cleanLoc = locationPath.split("?")[0].split("#")[0] || "/";
  if (!routePath || routePath === "/" || routePath === undefined) {
    return cleanLoc === "/" || cleanLoc === "";
  }
  return cleanLoc === routePath;
}

export function Router({ children }) {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = useCallback(
    (to, { replace = false } = {}) => {
      const resolved =
        to.startsWith("http://") ||
        to.startsWith("https://") ||
        to.startsWith("mailto:") ||
        to.startsWith("tel:") ||
        to.startsWith("#")
          ? to
          : new URL(to, window.location.origin).pathname +
            (to.includes("?") ? "?" + to.split("?")[1] : "");
      if (replace) {
        window.history.replaceState({ forward: true }, "", resolved);
      } else {
        window.history.pushState({ forward: true }, "", resolved);
      }
      setPath(resolved.split("?")[0].split("#")[0]);
    },
    [setPath]
  );

  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return (
    <LocationContext.Provider value={path}>
      <NavigateContext.Provider value={navigate}>
        {children}
      </NavigateContext.Provider>
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}

export function useNavigate() {
  return useContext(NavigateContext);
}

export function Link({ to, children, activeClassName = "", ...rest }) {
  const navigate = useNavigate();
  const path = useLocation();
  const external =
    to.startsWith("http://") ||
    to.startsWith("https://") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:") ||
    to.startsWith("#");
  const active = !external && matchRoute(to, path);

  const handleClick = (e) => {
    if (external) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={active ? `${rest.className || ""} ${activeClassName}`.trim() : rest.className}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Routes({ children }) {
  const path = useLocation();
  const items = Children.toArray(children).filter(Boolean);
  for (const child of items) {
    const { path: routePath, element } = child.props;
    if (matchRoute(routePath, path)) {
      return cloneElement(element, { key: routePath });
    }
  }
  return null;
}

export function Route() {
  return null;
}

export function Navigate({ to, replace }) {
  const navigate = useNavigate();
  useEffect(() => navigate(to, { replace }), [navigate, to, replace]);
  return null;
}
