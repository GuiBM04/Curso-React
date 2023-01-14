import { Route } from 'react-router-dom';

function Welcome() {
    return (
        <section>
            <h1>The Welcome page!</h1>

            <Route path='/welcome/new-user'>
                <p>Welcome, new use!</p>
            </Route>
        </section>
    );
}

export default Welcome;