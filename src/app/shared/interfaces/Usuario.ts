export interface Usuario {
    id:       number;
    username: string;
    fullName: string | null;
    email:    string;
    password: string;
    role:     string | null;
}
