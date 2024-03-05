import { User } from "../User";

interface Props {
    user: User;
}

export function UserProfile({ user }: Props) {
    console.log(user)
    return <div>
        <h3>Email: { user.email }</h3>
        <p>{ user.username }</p>
        <p style={{fontStyle: 'italic'}}>Admin: { user.admin? 'yes':'no' }</p>
    </div>
}
