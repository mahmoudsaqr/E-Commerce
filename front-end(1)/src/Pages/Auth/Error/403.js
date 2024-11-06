
import React from 'react';
import './403.css';
import { Link } from 'react-router-dom';

export default function Error403({role}) {
  return (
    <div className="error-container">
      <h1 className="error-code">403</h1>
      <p className="error-message">
        Sorry, you don't have permission to access this page.
      </p>
      <Link
        to={role === "1996" ? "/dashboard/writer" : "/"}
        className="home-link"
      >
        {role === "1996" ? "Go To Writer Page" : "Go to Home"}
      </Link>
    </div>
  );
}
