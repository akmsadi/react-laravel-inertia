export type Venue = {
    id: number;
    name: string;
};

export type SportsEvent = {
    id: number;
    title: string;
    description: string | null;
};

export type PlayerOption = {
    id: number;
    name: string;
};

export type Player = {
    id: number;
    name: string;
    nickname: string;
    organization: string | null;
    email: string | null;
    phone: string;
    address: string;
    status: 'approved' | 'pending' | 'guest' | 'rejected';
    guest_of_player_id: number | null;
    guest_of?: PlayerOption | null;
};

export type Team = {
    id: number;
    name: string;
    slug: string;
    slogan: string;
    about: string;
    logo: string | null;
    banner: string;
    established: number;
    matches: number;
    wins: number;
    titles: number;
    captain_id: number | null;
    vice_captain_id: number | null;
    is_external: boolean;
    captain?: PlayerOption | null;
    vice_captain?: PlayerOption | null;
};

export type MatchRecord = {
    id: number;
    match_type: string;
    format_overs: number;
    venue_id: number | null;
    venue?: Venue | null;
    scheduled_at: string | null;
    team_name: string;
    opponent_name: string;
    toss_winner: string | null;
    toss_decision: 'bat' | 'bowl' | null;
    match_status: string;
    result_type: string | null;
    result_summary: string | null;
    notes: string | null;
};

export type NewsletterSubscriber = {
    id: number;
    email: string;
    created_at: string | null;
};

export type PlayerDeposit = {
    id: number;
    player_id: number;
    amount: string;
    notes: string | null;
    created_at: string | null;
    player?: PlayerOption | null;
};

export type MatchOption = {
    id: number;
    team_name: string;
    opponent_name: string;
    scheduled_at: string | null;
};

export type Expense = {
    id: number;
    match_id: number | null;
    title: string;
    amount: string | number;
    notes: string | null;
    created_at: string | null;
    match?: MatchOption | null;
};

export type PlayerAccount = {
    id: number;
    name: string;
    phone: string;
    status: Player['status'];
    matches: number;
    deposited: number;
    owed: number;
    balance: number;
};

export type SquadPlayerOption = PlayerOption & {
    guest_of_name: string | null;
};

export type MatchSquadEntry = {
    player_id: number;
    side: 'team_a' | 'team_b';
    is_captain: boolean;
};

export type BatsmanLeaderboardRow = {
    id: number;
    name: string;
    matches: number;
    innings: number;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    highest: string;
    strike_rate: string;
    average: string;
};

export type BowlerLeaderboardRow = {
    id: number;
    name: string;
    matches: number;
    innings: number;
    wickets: number;
    overs: string;
    runs: number;
    best: string;
    economy: string;
};
