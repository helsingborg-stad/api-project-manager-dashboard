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
 * Text Domain:       mod-api-project-manager-dashboard
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('API_PROJECT_MANAGER_DASHBOARD_PATH', plugin_dir_path(__FILE__));
define('API_PROJECT_MANAGER_DASHBOARD_URL', plugins_url('', __FILE__));
define('API_PROJECT_MANAGER_DASHBOARD_TEMPLATE_PATH', API_PROJECT_MANAGER_DASHBOARD_PATH . 'templates/');

load_plugin_textdomain('api-project-manager-dashboard', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once API_PROJECT_MANAGER_DASHBOARD_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once API_PROJECT_MANAGER_DASHBOARD_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new ApiProjectManagerDashboard\Vendor\Psr4ClassLoader();
$loader->addPrefix('ApiProjectManagerDashboard', API_PROJECT_MANAGER_DASHBOARD_PATH);
$loader->addPrefix('ApiProjectManagerDashboard', API_PROJECT_MANAGER_DASHBOARD_PATH . 'source/php/');
$loader->register();

// Acf auto import and export
$acfExportManager = new \AcfExportManager\AcfExportManager();
$acfExportManager->setTextdomain('api-project-manager-dashboard');
$acfExportManager->setExportFolder(API_PROJECT_MANAGER_DASHBOARD_PATH . 'source/php/AcfFields/');
$acfExportManager->autoExport(array(
    // 'api-project-manager-dashboard-settings' => 'group_61ea7a87e8aaa' //Update with acf id here, settings view
));
$acfExportManager->import();

// Start application
new ApiProjectManagerDashboard\App();
