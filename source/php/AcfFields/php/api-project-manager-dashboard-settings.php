<?php 

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
    'key' => 'group_621e561328bf3',
    'title' => __('Dashboard settings', 'api-project-manager-dashboard'),
    'fields' => array(
        0 => array(
            'key' => 'field_621e5622c4978',
            'label' => __('API URL', 'api-project-manager-dashboard'),
            'name' => 'project_manager_dashboard_api_url',
            'type' => 'text',
            'instructions' => __('eg. https://your-domain/wp-json/wp/v2/project', 'api-project-manager-dashboard'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'api-project-manager-dashboard-settings',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
));
}