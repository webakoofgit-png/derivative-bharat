import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  createContext,
  useContext,
} from "react";

export type AppLocation = {
  pathname: string;
  search: string;
  hash: string;
};

export type RouteParams = Record<string, string>;

type NavigationContextValue = AppLocation & {
  params: RouteParams;
  navigate: (to: string) => void;
};

type LocationSelector<T> = {
  select: (location: AppLocation) => T;
};

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  params?: Record<string, string | number>;
  activeProps?: Partial<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">>;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: NavigationContextValue;
}) {
  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function getBrowserLocation(): AppLocation {
  if (typeof window === "undefined") {
    return { pathname: "/", search: "", hash: "" };
  }

  return {
    pathname: window.location.pathname || "/",
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function useNavigate() {
  return useNavigation().navigate;
}

export function useParams(_options?: unknown) {
  return useNavigation().params;
}

export function useLocation(): AppLocation;
export function useLocation<T>(options: LocationSelector<T>): T;
export function useLocation<T>(options?: LocationSelector<T>) {
  const { pathname, search, hash } = useNavigation();
  const location = { pathname, search, hash };
  return options?.select ? options.select(location) : location;
}

export function Link({
  activeProps,
  children,
  className,
  onClick,
  params,
  style,
  target,
  to,
  ...props
}: LinkProps) {
  const { navigate, pathname } = useNavigation();
  const href = buildPath(to, params);
  const isActive = isActivePath(pathname, href);
  const {
    className: activeClassName,
    style: activeStyle,
    ...activeOnlyProps
  } = activeProps ?? {};
  const mergedClassName = [className, isActive ? activeClassName : undefined].filter(Boolean).join(" ") || undefined;
  const mergedStyle = isActive ? { ...style, ...activeStyle } : style;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      (target && target !== "_self") ||
      isExternalHref(href)
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <a
      {...props}
      {...(isActive ? activeOnlyProps : undefined)}
      href={href}
      className={mergedClassName}
      style={mergedStyle}
      target={target}
      aria-current={isActive ? props["aria-current"] ?? activeProps?.["aria-current"] ?? "page" : props["aria-current"]}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("Navigation hooks must be used inside NavigationProvider");
  }

  return context;
}

function buildPath(to: string, params?: Record<string, string | number>) {
  if (!params) {
    return to;
  }

  return Object.entries(params).reduce((path, [key, value]) => {
    const encodedValue = encodeURIComponent(String(value));
    return path.replace(`$${key}`, encodedValue).replace(`:${key}`, encodedValue);
  }, to);
}

function normalizePath(path: string) {
  const pathname = path.split(/[?#]/)[0] || "/";
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

function isActivePath(currentPath: string, href: string) {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}

function isExternalHref(href: string) {
  return /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}
