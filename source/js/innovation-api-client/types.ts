
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

    export interface Title {
        rendered: string;
    }

    export interface Content {
        rendered: string;
        protected: boolean;
    }

    export interface ChallengeCategory {
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

    export interface Technology {
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

    export interface Sector {
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

    export interface Organisation {
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
    export interface Operation {
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

    export interface GlobalGoal {
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
        featured_image: string;
    }

    export interface Partner {
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

    export interface Participant {
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

    export interface ExpectedImpact {
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

    export interface InnovationPotential {
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
        status: Status[];
        type: string;
        title: Title;
        content: Content;
        featured_media: number;
        challenge_category: ChallengeCategory[];
        technology: Technology[];
        sector: Sector[];
        operation: Operation[];
        organisation: Organisation[];
        global_goal: GlobalGoal[];
        partner: Partner[];
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
        participants: Participant[];
        expected_impact: ExpectedImpact[];
        platforms: number[];
        innovation_potential: InnovationPotential[];
        map: Map;
        contacts: Contact[];
        links?: any;
        files?: any;
        gallery?: any;
        video?: any;
        _links: Links;
    }

