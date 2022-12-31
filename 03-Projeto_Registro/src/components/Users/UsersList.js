import userListStyles from './UsersList.module.css';

// import Card from '../UI/Card';

function UsersList(props) {
    return (
        <div className={userListStyles.users}>
            <ul>
                {props.users.map(user => {
                    return <li key={Math.random().toString()}>
                        {user.name} ({user.age} years old)
                    </li>
                })}
            </ul>
        </div>
    );
}

export default UsersList;