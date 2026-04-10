export interface Profile {
    fullName: string;
    userName: string;
    profilePictureURL: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    id: number;
    titleId: number | null;
    userId: number;
}