<?php
/**
 * Plugin Name: The Accountant — Content Fields
 * Description: Registers the Team Member post type and all ACF fields (article meta, author meta, team member meta) used by The Accountant Next.js frontend. Requires Advanced Custom Fields.
 * Version: 1.0.0
 * Author: The Accountant
 * License: GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* -------------------------------------------------------------------------
 * Redirect all public front-end traffic to the headless frontend.
 *
 * template_redirect only runs for normal front-end page views, so this
 * never touches: /wp-admin, /wp-login.php, /graphql, /wp-json (REST),
 * admin-ajax.php, cron, or directly-served files like /wp-content/uploads.
 * ---------------------------------------------------------------------- */
define( 'TA_FRONTEND_URL', 'https://theaccountantmag.com' );

add_action( 'template_redirect', function () {
	// Extra safety: never redirect logged-in editors previewing content.
	if ( is_user_logged_in() && is_preview() ) {
		return;
	}

	// Map known content URLs to their frontend equivalents; everything
	// else goes to the homepage.
	$target = TA_FRONTEND_URL;

	if ( is_singular( 'post' ) ) {
		$target .= '/article/' . get_post_field( 'post_name', get_queried_object_id() );
	} elseif ( is_category() ) {
		$cat = get_queried_object();
		if ( $cat && ! is_wp_error( $cat ) ) {
			$target .= '/category/' . $cat->slug;
		}
	} elseif ( is_author() ) {
		$author = get_queried_object();
		if ( $author ) {
			$target .= '/author/' . $author->user_nicename;
		}
	} elseif ( is_search() ) {
		$target .= '/search';
	}

	wp_redirect( $target, 301 );
	exit;
} );

/* -------------------------------------------------------------------------
 * Admin notice if ACF is missing
 * ---------------------------------------------------------------------- */
add_action( 'admin_notices', function () {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		echo '<div class="notice notice-error"><p><strong>The Accountant — Content Fields:</strong> Advanced Custom Fields must be installed and active for the custom fields to appear.</p></div>';
	}
} );

/* -------------------------------------------------------------------------
 * Team Member custom post type
 * (GraphQL args included — picked up automatically once WPGraphQL is active)
 * ---------------------------------------------------------------------- */
add_action( 'init', function () {
	register_post_type( 'team_member', array(
		'labels' => array(
			'name'          => 'Team Members',
			'singular_name' => 'Team Member',
			'add_new_item'  => 'Add New Team Member',
			'edit_item'     => 'Edit Team Member',
		),
		'public'              => true,
		'has_archive'         => false,
		'menu_icon'           => 'dashicons-groups',
		'menu_position'       => 21,
		'supports'            => array( 'title', 'page-attributes' ), // title = name; order via menu_order
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'teamMember',
		'graphql_plural_name' => 'teamMembers',
	) );
} );

/* -------------------------------------------------------------------------
 * ACF field groups
 * ---------------------------------------------------------------------- */
add_action( 'acf/init', function () {

	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	/* ---- 1. Article meta (on Posts) → articleMeta ---- */
	acf_add_local_field_group( array(
		'key'                   => 'group_ta_article_meta',
		'title'                 => 'Article Meta',
		'show_in_graphql'       => 1,
		'graphql_field_name'    => 'articleMeta',
		'map_graphql_types_from_location_rules' => 1,
		'location'              => array(
			array(
				array( 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ),
			),
		),
		'position'              => 'side',
		'fields'                => array(
			array(
				'key'               => 'field_ta_read_time',
				'name'              => 'read_time',
				'label'             => 'Read time (minutes)',
				'type'              => 'number',
				'instructions'      => 'Estimated reading time. Leave empty to hide.',
				'min'               => 1,
				'step'              => 1,
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'readTime',
			),
			array(
				'key'               => 'field_ta_featured',
				'name'              => 'featured',
				'label'             => 'Featured story',
				'type'              => 'true_false',
				'instructions'      => 'Eligible for the homepage hero and Featured grid.',
				'ui'                => 1,
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'featured',
			),
			array(
				'key'               => 'field_ta_editors_pick',
				'name'              => 'editors_pick',
				'label'             => "Editor's pick",
				'type'              => 'true_false',
				'instructions'      => "Shown in the Editor's Picks band on the homepage.",
				'ui'                => 1,
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'editorsPick',
			),
		),
	) );

	/* ---- 2. Author meta (on Users) → authorMeta ---- */
	acf_add_local_field_group( array(
		'key'                   => 'group_ta_author_meta',
		'title'                 => 'Author Profile',
		'show_in_graphql'       => 1,
		'graphql_field_name'    => 'authorMeta',
		'map_graphql_types_from_location_rules' => 1,
		'location'              => array(
			array(
				array( 'param' => 'user_form', 'operator' => '==', 'value' => 'all' ),
			),
		),
		'fields'                => array(
			array(
				'key'               => 'field_ta_role_title',
				'name'              => 'role_title',
				'label'             => 'Role / title',
				'type'              => 'text',
				'instructions'      => 'e.g. "Tax Correspondent" — shown on bylines and the author page.',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'roleTitle',
			),
			array(
				'key'               => 'field_ta_author_avatar',
				'name'              => 'avatar_image',
				'label'             => 'Avatar image',
				'type'              => 'image',
				'instructions'      => 'Overrides Gravatar. Square, at least 400×400.',
				'return_format'     => 'array',
				'preview_size'      => 'thumbnail',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'avatarImage',
			),
			array(
				'key'               => 'field_ta_author_twitter',
				'name'              => 'twitter_url',
				'label'             => 'X / Twitter URL',
				'type'              => 'url',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'twitterUrl',
			),
			array(
				'key'               => 'field_ta_author_linkedin',
				'name'              => 'linkedin_url',
				'label'             => 'LinkedIn URL',
				'type'              => 'url',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'linkedinUrl',
			),
			array(
				'key'               => 'field_ta_author_email',
				'name'              => 'public_email',
				'label'             => 'Public email',
				'type'              => 'email',
				'instructions'      => 'Shown publicly on the site. Leave empty to hide.',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'publicEmail',
			),
		),
	) );

	/* ---- 3. Team member meta (on team_member CPT) → teamMemberMeta ---- */
	acf_add_local_field_group( array(
		'key'                   => 'group_ta_team_member_meta',
		'title'                 => 'Team Member Details',
		'show_in_graphql'       => 1,
		'graphql_field_name'    => 'teamMemberMeta',
		'map_graphql_types_from_location_rules' => 1,
		'location'              => array(
			array(
				array( 'param' => 'post_type', 'operator' => '==', 'value' => 'team_member' ),
			),
		),
		'fields'                => array(
			array(
				'key'               => 'field_ta_tm_role',
				'name'              => 'role',
				'label'             => 'Role',
				'type'              => 'text',
				'instructions'      => 'e.g. "Editor-in-Chief", "Art Director".',
				'required'          => 1,
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'role',
			),
			array(
				'key'               => 'field_ta_tm_bio',
				'name'              => 'bio',
				'label'             => 'Short bio',
				'type'              => 'textarea',
				'rows'              => 4,
				'required'          => 1,
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'bio',
			),
			array(
				'key'               => 'field_ta_tm_photo',
				'name'              => 'photo',
				'label'             => 'Photo',
				'type'              => 'image',
				'instructions'      => 'Square crop works best (site shows 1:1).',
				'return_format'     => 'array',
				'preview_size'      => 'medium',
				'required'          => 1,
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'photo',
			),
			array(
				'key'               => 'field_ta_tm_twitter',
				'name'              => 'twitter_url',
				'label'             => 'X / Twitter URL',
				'type'              => 'url',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'twitterUrl',
			),
			array(
				'key'               => 'field_ta_tm_linkedin',
				'name'              => 'linkedin_url',
				'label'             => 'LinkedIn URL',
				'type'              => 'url',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'linkedinUrl',
			),
			array(
				'key'               => 'field_ta_tm_email',
				'name'              => 'email',
				'label'             => 'Email',
				'type'              => 'email',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'email',
			),
			array(
				'key'               => 'field_ta_tm_linked_author',
				'name'              => 'linked_author',
				'label'             => 'Linked author account',
				'type'              => 'user',
				'instructions'      => 'If this person also writes, link their user so the card links to their author page.',
				'allow_null'        => 1,
				'multiple'          => 0,
				'return_format'     => 'array',
				'show_in_graphql'   => 1,
				'graphql_field_name'=> 'linkedAuthor',
			),
		),
	) );
} );

/* -------------------------------------------------------------------------
 * Flush rewrite rules once on activation (for the CPT)
 * ---------------------------------------------------------------------- */
register_activation_hook( __FILE__, function () {
	// Ensure the CPT exists before flushing.
	do_action( 'init' );
	flush_rewrite_rules();
} );
