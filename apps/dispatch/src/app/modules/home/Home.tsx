import React from 'react';
import './Home.scss';

export interface HomeProps {}

export const Home = (props: HomeProps) => {
  return (
    <div>
      <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Heroes, Inc</h1>
        <p className="lead">
          Premier just-in-time solutions for staffing your extraordinary jobs!
          Our platform enables heroes to operate at peak efficiency by
          integrating our award-winning apps with the latest in machine learning
          and optimization technology. Your citizens and city representatives
          will love our product and we're sure your heroes will too!
        </p>
      </div>

      <div className="container">
        <div className="card-deck mb-3 text-center">
          <div className="card mb-4 shadow-sm">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Heroes</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $0 <small className="text-muted">/ mo</small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Get paid!</li>
                <li>Receive alerts</li>
                <li>Schedule time off</li>
                <li>Track skill progression</li>
              </ul>
              <button
                type="button"
                className="btn btn-lg btn-block btn-primary"
              >
                Get started!
              </button>
            </div>
          </div>
          <div className="card mb-4 shadow-sm">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Call Center</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $1M <small className="text-muted">/ mo</small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Manage multiple squads</li>
                <li>Optimize scheduling</li>
                <li>Realtime analytics</li>
                <li>Tier 1 support</li>
              </ul>
              <button
                type="button"
                className="btn btn-lg btn-block btn-primary"
              >
                Talk to Sales
              </button>
            </div>
          </div>
          <div className="card mb-4 shadow-sm">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Citizen</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">
                $0 <small className="text-muted">/ mo</small>
              </h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Free for life</li>
                <li>
                  Track <em>My-Emergency</em>
                </li>
                <li>Check outages</li>
                <li>Report a crime</li>
              </ul>
              <button
                type="button"
                className="btn btn-lg btn-block btn-primary"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
