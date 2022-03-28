
    interface Taxonomy {
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

    export interface Title {
        rendered: string;
    }

    export interface Content {
        rendered: string;
        protected: boolean;
    }
    export interface FundsGranted {
        amount: string;
        date: string;
        comment: string;
    }

    export interface FundsUsed {
        amount: string;
        date: string;
        comment: string;
    }

    export interface ImpactGoal {
        impact_goal: string;
        impact_goal_comment: string;
        impact_goal_completed: boolean;
    }

    export interface Challenge {
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

    export interface Map {
        address: string;
        lat: string;
        lng: string;
    }

    export interface Contact {
        name: string;
        email: string;
    }

    export interface Self {
        href: string;
    }

    export interface Collection {
        href: string;
    }

    export interface About {
        href: string;
    }

    export interface Author {
        embeddable: boolean;
        href: string;
    }

    export interface VersionHistory {
        count: number;
        href: string;
    }

    export interface PredecessorVersion {
        id: number;
        href: string;
    }

    export interface WpFeaturedmedia {
        embeddable: boolean;
        href: string;
    }

    export interface WpAttachment {
        href: string;
    }

    export interface WpTerm {
        taxonomy: string;
        embeddable: boolean;
        href: string;
    }

    export interface Cury {
        name: string;
        href: string;
        templated: boolean;
    }

    export interface Links {
        self: Self[];
        collection: Collection[];
        about: About[];
        author: Author[];
        'version-history': VersionHistory[];
        'predecessor-version': PredecessorVersion[];
        'wp:featuredmedia': WpFeaturedmedia[];
        'wp:attachment': WpAttachment[];
        'wp:term': WpTerm[];
        curies: Cury[];
    }

    export interface RootObject {
        id: number;
        date: Date;
        date_gmt: Date;
        modified: Date;
        modified_gmt: Date;
        slug: string;
        status: Taxonomy[];
        type: string;
        title: Title;
        content: Content;
        featured_media: number;
        challenge_category: Taxonomy[];
        technology: Taxonomy[];
        sector: Taxonomy[];
        operation: Taxonomy[];
        operation_domain: Taxonomy[];
        organisation: Taxonomy[];
        global_goal: Taxonomy[];
        partner: Taxonomy[];
        'innovation-potential': number[];
        'expected-impact': number[];
        previous_status_progress_value: string;
        previous_status: string;
        project_what: string;
        project_why: string;
        project_how: string;
        estimated_budget: string;
        cost_so_far: string;
        city_wide_initiative: boolean;
        challenging_the_core_business: boolean;
        internal_project: boolean;
        funds_granted: FundsGranted[];
        funds_used: FundsUsed[];
        impact_goals: ImpactGoal[];
        resident_involvement?: any;
        challenge: Challenge;
        participants: Taxonomy[];
        expected_impact: Taxonomy[];
        platforms: number[];
        innovation_potential: Taxonomy[];
        map: Map;
        contacts: Contact[];
        links?: any;
        files?: any;
        gallery?: any;
        video?: any;
        _links: Links;
    }

