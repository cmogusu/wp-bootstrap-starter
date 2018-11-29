<?php

/*
* This anonymous function wraps the adsense functionality
* 
* It imports the below files
* 1) The 'toggle-adsense-ads-metabox.php' file displays a metabox with a checkbox to show or hide the adsense ads 
* 2) The file : 'insert-adsense-ads.php' adds the adsense ad on the post pages after the first paragraph or after the first image in every paragraph. It also sets up shortcodes that display different ads
* 3) 'Adsense-shortcode-buttons.php' is a small file that adds a button to the wordpress editor. When clicked, the button makes it easier to add the adsense shortcodes.
*/

(function(){
    require('adsense/toggle-adsense-ads-metabox.php');
    require('adsense/insert-adsense-ads.php');
    require('adsense/adsense-shortcode-buttons.php');

    new \adsense\toggle_adsense_ad_metabox();
    new \adsense\insert_adsense_ads();
    new \adsense\adsense_shortcode_buttons();
})();


/*
* This function wraps the featured content functionality
*/
(function(){
    // we first add hooks that will display each of the three featured content
    add_action('wp_bootstrap_starter_below_content1', 'featured_contenido1');
    add_action('wp_bootstrap_starter_below_content2', 'featured_contenido2');
    add_action('wp_bootstrap_starter_below_content3', 'featured_contenido3');


    function featured_contenido1() {
        global $wp_query;

        $paged  = (get_query_var('paged')) ? get_query_var('paged') : 1;
        $postid = $wp_query->post->ID;

        if( is_singular() && get_post_meta( $postid, 'post_featconte1', true ) == "show" ) {
            get_template_part( 'featured-content/templates/content', '1' );
        }
    }


    function featured_contenido2() {
        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
        global $wp_query;
        $postid = $wp_query->post->ID;
        if( is_singular() && get_post_meta( $postid, 'post_featconte2', true ) == "show" ) {
            get_template_part( 'featured-content/templates/content', '2' );
        }
    }


    function featured_contenido3() {
        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
        global $wp_query;
        $postid = $wp_query->post->ID;
        if( is_singular() && get_post_meta( $postid, 'post_featconte3', true ) == "show" ) {
            get_template_part( 'featured-content/templates/content', '3' );
        }
    }


    // Here we import the file 'admin-metabox.php' that displays the metabox on the post edit pages
    require('featured-content/admin-metabox.php');

    new \featured_content\admin_metabox();
})();


/* 
*  This anonymous function wraps the anchor links functionality
*/ 
(function(){

    // We first import and initaite the class that displays the metabox on the post edit page 
    require('post-menu/admin-metabox.php');
    new \post_menu\admin_metabox();


    // Next we import and initiate a class that creates the shortcode and displays the menu on the front end
    require('post-menu/display-menu.php');
    new \post_menu\display_menu();  


    // This section adds a javascript file that makes to the top navigation bar sticky
    add_action('wp_enqueue_scripts', function(){
        $base_url  = get_template_directory_uri().'/post-menu';

        wp_enqueue_script( 'sticky-top-nav', $base_url.'/js/sticky-top-nav.js', ['jquery','underscore'],'0.5',true );
    });
    
})();
