<?php

namespace ApiProjectManagerDashboard\Module;

class InnovationDashboard extends \Modularity\Module
{
    public $slug = 'innovation-dashboard';
    public $supports = array();

    public function init()
    {
        $this->nameSingular = __("Innovation Dashboard", API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN);
        $this->namePlural = __("Innovation Dashboards", API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN);
        $this->description = __("Renders dashboard for innovation initiatives.", API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN);
    }

    public function data(): array
    {
        $data = array();
        $data['apiEndpoint'] = get_field('project_manager_dashboard_api_url', 'options');
        $data['contentEndpoint'] = get_field('project_manager_dashboard_content_endpoint', 'options');
        $data['classNames'] = implode(' ', [
            'js-api-project-manager-dashboard',
            'api-project-manager-dashboard',
            'api-project-manager-dashboard--bg-white',
        ]);

        return $data;
    }

    public function template(): string
    {
        return "innovation-dashboard.blade.php";
    }

    public function script()
    {
        wp_enqueue_script('api-project-manager-dashboard-js');
    }


    public function style()
    {
        wp_enqueue_style('api-project-manager-dashboard-css');
    }

    /**
     * Available "magic" methods for modules:
     * init()            What to do on initialization
     * data()            Use to send data to view (return array)
     * style()           Enqueue style only when module is used on page
     * script            Enqueue script only when module is used on page
     * adminEnqueue()    Enqueue scripts for the module edit/add page in admin
     * template()        Return the view template (blade) the module should use when displayed
     */
}
