import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const DASHBOARD_ENTRY_SELECTOR = '.js-api-project-manager-dashboard';
const DASHBOARD_API_URL_ATTRIBUTE = 'data-api-url';

const renderDashboard = (element: Element) => {
  ReactDOM.render(
    <React.StrictMode>
      <App apiUrl={element.getAttribute(DASHBOARD_API_URL_ATTRIBUTE) ?? ''} />
    </React.StrictMode>,
    element,
  );
};

document.addEventListener('DOMContentLoaded', function () {
  const dashboardElements = Array.from(document.querySelectorAll(DASHBOARD_ENTRY_SELECTOR) ?? []);
  dashboardElements
    .filter((element: Element) => element.getAttribute(DASHBOARD_API_URL_ATTRIBUTE)?.length ?? -1 > 0)
    .forEach(renderDashboard);
});
