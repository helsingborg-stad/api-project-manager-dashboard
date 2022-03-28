import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const DASHBOARD_ENTRY_SELECTOR = '.js-api-project-manager-dashboard';
const DASHBOARD_API_ENDPOINT_ATTRIBUTE = 'data-api-endpoint';
const DASHBOARD_CONTENT_ENDPOINT_ATTRIBUTE = 'data-content-endpoint';

const renderDashboard = (element: Element, apiEndpoint: string, contentEndpoint: string) => {
  ReactDOM.render(
    <React.StrictMode>
      <App apiEndpoint={apiEndpoint} contentEndpoint={contentEndpoint} />
    </React.StrictMode>,
    element,
  );
};

const init = () => {
  const dashboardElements = Array.from(document.querySelectorAll(DASHBOARD_ENTRY_SELECTOR) ?? []);
  dashboardElements
    .map((element: Element) => ({
      element: element,
      apiEndpoint: element.getAttribute(DASHBOARD_API_ENDPOINT_ATTRIBUTE) ?? '',
      contentEndpoint: element.getAttribute(DASHBOARD_CONTENT_ENDPOINT_ATTRIBUTE) ?? '',
    }))
    .filter(({ apiEndpoint, contentEndpoint }) => apiEndpoint.length > 0 && contentEndpoint.length > 0)
    .forEach(({ element, apiEndpoint, contentEndpoint }) => renderDashboard(element, apiEndpoint, contentEndpoint));
};

document.addEventListener('DOMContentLoaded', init);
