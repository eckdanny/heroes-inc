import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { NavLink } from 'reactstrap';

type NavProps = {
  routes: Array<{
    path?: string; //  | string[];
    exact?: boolean;
    name: string;
  }>;
};

export const Nav: React.FC<NavProps> = ({ routes }) => {
  if (!routes.length) return null;
  return (
    <nav className="nav my-2 my-md-0 mr-md-3">
      {routes.map(({ path, name, exact }) => (
        <li className="nav-item" key={path}>
          <NavLink
            to={path}
            exact={exact}
            tag={RouterNavLink}
            className="p-2"
            activeClassName="active disabled"
          >
            {name}
          </NavLink>
        </li>
      ))}
    </nav>
  );
};
