export interface Post {
    ID: number;
    post_author: string;
    post_date: string;
    post_date_gmt: string;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: string;
    comment_status: string;
    ping_status: string;
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string;
    post_modified_gmt: string;
    post_content_filtered: string;
    post_parent: number;
    guid: string;
    menu_order: number;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    filter: string;
}

export interface Taxonomy {
    term_id: number;
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
}

export interface Organisation extends Taxonomy {}
export interface Sector extends Taxonomy {}
export interface Partner extends Taxonomy {}
export interface GlobalGoal extends Taxonomy {}
export interface Technology extends Taxonomy {}
export interface ChallengeCategory extends Taxonomy {}

export interface ImpactGoal {
    impact_goal: string;
    impact_goal_comment: string;
    impact_goal_completed: boolean;
}

export interface ResidentInvolvement {
    description: string;
}

export interface Challenge extends Post {}

export interface Status {
    term_id: number;
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
    progress_value: string;
}

export interface InnovationProject {
    id: number;
/*
    date: Date;
    date_gmt: Date;
    modified: Date;
    modified_gmt: Date;
 */
    slug: string;
    status: Status[];
/*
    type: string;
    title: Title;
    content: Content;
    featured_media: number;
*/
    challenge_category: ChallengeCategory[];
    technology?: Technology[];
    sector?: Sector[];
    organisation?: Organisation[];
    global_goal?: GlobalGoal[];
    partner?: Partner[];
/*
    previous_status_progress_value: string;
    previous_status: string;
    project_what: string;
    project_why: string;
    project_how: string;
    estimated_budget: string;
    cost_so_far?: any;
*/
    impact_goals?: ImpactGoal[];
    resident_involvement?: ResidentInvolvement[];
    challenge?: Challenge;
    platforms?: any;
/*
    map: Map;
    contacts: Contact[];
    links?: any;
    files?: any;
    gallery?: any;
    video?: any;
    internal_project: boolean;
    _links: Links;
*/
}
