import React from 'react';
import Brand from './Brand';
import './Header.scss';

type HeaderProps = {
  nav: React.ReactNode;
  brand: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ nav, brand }) => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      {brand}
      {nav}
    </div>
  );
};

Header.defaultProps = {
  brand: <Brand />
};
