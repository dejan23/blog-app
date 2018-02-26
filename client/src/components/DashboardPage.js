import React from 'react';
import { Link } from 'react-router-dom';


const DashboardPage = () => (
  <div className="content-container">
    <p>Dashboard page content</p>
    <p><Link to='#'>Add article</Link></p>
    <p><Link to='/feature'>Go to feature page</Link></p>
  </div>
)

export default DashboardPage;
