import { Link, NavLink, useLocation } from "react-router-dom";
import { handleScrollNavigation } from "../lib/scrollTo.js";

function useScrollClickHandler(to, onClick) {
  const location = useLocation();

  return (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    handleScrollNavigation(location, to);
  };
}

export function AppLink({ to, onClick, ...props }) {
  const handleClick = useScrollClickHandler(to, onClick);
  return <Link to={to} onClick={handleClick} {...props} />;
}

export function AppNavLink({ to, onClick, ...props }) {
  const handleClick = useScrollClickHandler(to, onClick);
  return <NavLink to={to} onClick={handleClick} {...props} />;
}
