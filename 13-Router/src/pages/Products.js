import { Link } from 'react-router-dom';

function Products() {
    return (
        <section>
            <h1>The Products page!</h1>

            <ul>
                <li>
                    <Link to='/product/p1'>Book</Link>
                </li>
                <li>
                    <Link to='/product/p2'>Carpet</Link>
                </li>
                <li>
                    <Link to='/product/p3'>Online Course</Link>
                </li>
            </ul>
        </section>
    );
}

export default Products;