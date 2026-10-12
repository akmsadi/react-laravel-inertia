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
