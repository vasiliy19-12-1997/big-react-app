import { User } from '@/entities/User';

export interface Commentary {
    id: string,
    text: string,
    user:User
}
