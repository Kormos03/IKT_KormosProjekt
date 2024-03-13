import { User } from "../User";

interface Props {
    user: User;
}

export function UserProfile({ user }: Props) {
    return <>
        <h3>Email: { user.email }</h3>
        <p>{ user.username }</p>
        <p>Ez a profil oldal</p>
    </>
}
