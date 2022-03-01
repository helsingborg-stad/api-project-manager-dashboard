<?php

namespace ApiProjectManagerDashboard;

class App
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        wp_register_style(
            'api-project-manager-dashboard-css',
            API_PROJECT_MANAGER_DASHBOARD_URL . '/dist/' .
            \ApiProjectManagerDashboard\Helper\CacheBust::name('css/api-project-manager-dashboard.css')
        );
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        wp_enqueue_script(
            'api-project-manager-dashboard-js',
            API_PROJECT_MANAGER_DASHBOARD_URL . '/dist/' .
            \ApiProjectManagerDashboard\Helper\CacheBust::name('js/api-project-manager-dashboard.js', false)
        );
    }
}
