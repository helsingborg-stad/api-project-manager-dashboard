import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const DASHBOARD_ENTRY_SELECTOR = '.js-api-project-manager-dashboard';
const DASHBOARD_API_URL_ATTRIBUTE = 'data-api-url';

const renderDashboard = (element: Element, url: string) => {
  ReactDOM.render(
    <React.StrictMode>
      <App apiUrl={url} />
    </React.StrictMode>,
    element,
  );
};

const init = () => {
  const dashboardElements = Array.from(document.querySelectorAll(DASHBOARD_ENTRY_SELECTOR) ?? []);
  dashboardElements
    .map((element: Element) => ({
      element: element,
      url: element.getAttribute(DASHBOARD_API_URL_ATTRIBUTE) ?? '',
    }))
    .filter(({ url }) => url.length > 0)
    .forEach(({ element, url }) => renderDashboard(element, url));
};

document.addEventListener('DOMContentLoaded', init);
