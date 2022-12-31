import styles from './Card.module.css';

function Card(props) {
    return <div className={`${styles.card} ${props.cssClass}`}>{props.children}</div>
}

export default Card;