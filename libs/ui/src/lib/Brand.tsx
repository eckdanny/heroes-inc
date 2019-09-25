import React from 'react';
import { Link } from 'react-router-dom';
import './Brand.scss';

type BrandProps = {
  companyName?: string;
  href?: string;
};

export const Brand: React.FC<BrandProps> = props => {
  return (
    <h5 className="my-0 mr-md-auto font-weight-normal Brand">
      <Link to="/" className="text-dark">
        {props.companyName}
      </Link>
    </h5>
  );
};

Brand.defaultProps = {
  companyName: 'Heroes, Inc'
};

export default Brand;
