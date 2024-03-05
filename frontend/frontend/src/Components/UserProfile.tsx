import { User } from "../User";

interface Props {
    user: User;
}

export function UserProfile({ user }: Props) {
    //const { user } = props;
    return <div>
        <h2>Email: { user.email }</h2>
        <p>{ user.username }</p>
        <p style={{fontStyle: 'italic'}}>Admin: { user.admin? 'yes': 'no' }</p>
    </div>
}
