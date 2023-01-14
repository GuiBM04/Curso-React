import { useEffect } from "react";
import { Route, Link, useParams, useRouteMatch } from "react-router-dom";

import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// const DUMMY_QUOTES = [
//     { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
//     { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' }
// ];

function QuoteDetail() {
    const params = useParams();
    const match = useRouteMatch();
    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

    const { quoteId } = params;

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if(status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        );
    }

    if(error) {
        return (
            <p className='centered focused'>{error}</p>
        );
    }

    if(!loadedQuote.text) {
        return <p>No Quote found!</p>;
    }

    return (
        <section>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>

            <Route path={match.path} exact>
                <div className='centered'>
                    <Link to={`${match.url}/comments`} className='btn--flat'>Load Comments</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </section>
    );
}

export default QuoteDetail;