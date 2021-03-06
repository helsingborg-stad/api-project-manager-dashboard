<?php

/**
 * Plugin Name:       API Project Manager Dashboard
 * Plugin URI:        https://github.com/helsingborg-stad/api-project-manager-dashboard
 * Description:       Dashboard plugin for project related data.
 * Version:           1.0.0
 * Author:            Nikolas Ramstedt @ Helsingborg Stad
 * Author URI:        https://github.com/helsingborg-stad
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       api-project-manager-dashboard
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('API_PROJECT_MANAGER_DASHBOARD_PATH', plugin_dir_path(__FILE__));
define('API_PROJECT_MANAGER_DASHBOARD_URL', plugin_dir_url(__FILE__));
define('API_PROJECT_MANAGER_DASHBOARD_TEMPLATE_PATH', API_PROJECT_MANAGER_DASHBOARD_PATH . 'templates/');
define('API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN', 'api-project-manager-dashboard');

load_plugin_textdomain(API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN, false, API_PROJECT_MANAGER_DASHBOARD_PATH . '/languages');

require_once API_PROJECT_MANAGER_DASHBOARD_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once API_PROJECT_MANAGER_DASHBOARD_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new ApiProjectManagerDashboard\Vendor\Psr4ClassLoader();
$loader->addPrefix('ApiProjectManagerDashboard', API_PROJECT_MANAGER_DASHBOARD_PATH);
$loader->addPrefix('ApiProjectManagerDashboard', API_PROJECT_MANAGER_DASHBOARD_PATH . 'source/php/');
$loader->register();

// Acf auto import and export
add_action('plugins_loaded', function () {
    $acfExportManager = new \AcfExportManager\AcfExportManager();
    $acfExportManager->setTextdomain(API_PROJECT_MANAGER_DASHBOARD_TEXT_DOMAIN);
    $acfExportManager->setExportFolder(API_PROJECT_MANAGER_DASHBOARD_PATH . 'source/php/AcfFields/');
    $acfExportManager->autoExport(array(
        'api-project-manager-dashboard-settings' => 'group_621e561328bf3' //Update with acf id here, settings view
    ));
    $acfExportManager->import();
});

add_action('plugins_loaded', function () {
    if (function_exists('modularity_register_module')) {
        modularity_register_module(
            API_PROJECT_MANAGER_DASHBOARD_PATH . 'source/php/Module/',
            'InnovationDashboard'
        );
    }
});

add_filter('Modularity/Module/TemplatePath', function ($paths) {
    $paths[] = API_PROJECT_MANAGER_DASHBOARD_PATH . 'source/php/Module/views/';
    return $paths;
});

// Start application
new ApiProjectManagerDashboard\App();
