<?php
/*-----------------------------------------------------------------------------------*/
// Add Featured Content under pages posts
/*-----------------------------------------------------------------------------------*/
// Add Wide Featured Videos before opening #content div tag
add_action('wp_bootstrap_starter_below_content1', 'featured_contenido1');

// Add Wide Featured Videos before opening #content div tag
add_action('wp_bootstrap_starter_below_content2', 'featured_contenido2');

// Add Wide Featured Videos before opening #content div tag
add_action('wp_bootstrap_starter_below_content3', 'featured_contenido3');
/*-----------------------------------------------------------------------------------*/
// Various Functions to call Featured Content sliders
/*-----------------------------------------------------------------------------------*/
// Featured Contenido 1
function featured_contenido1() {
	$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
	global $wp_query;
	$postid = $wp_query->post->ID;
	if( is_singular() && get_post_meta( $postid, 'post_featconte1', true ) == "Yes" ) {
		get_template_part( 'featured', 'contenta' );
	}
}

// Featured Contenido 2
function featured_contenido2() {
	$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
	global $wp_query;
	$postid = $wp_query->post->ID;
	if( is_singular() && get_post_meta( $postid, 'post_featconte2', true ) == "Yes" ) {
		get_template_part( 'featured', 'contentb' );
	}
}

// Featured Contenido 3
function featured_contenido3() {
	$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
	global $wp_query;
	$postid = $wp_query->post->ID;
	if( is_singular() && get_post_meta( $postid, 'post_featconte3', true ) == "Yes" ) {
		get_template_part( 'featured', 'contentc' );
	}
}
?>