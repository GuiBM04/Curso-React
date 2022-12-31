import ErrorStyles from './ErrorModal.module.css';

import Card from './Card';
import Button from './Button';

function ErrorModal(props) {
    return (
        <div>
            {/* <div className={ErrorStyles.backdrop} onClick={props.onConfirm} /> */}
            <Card className={ErrorStyles.modal}>
                <header className={ErrorStyles.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={ErrorStyles.content}>
                     <p>{props.message}</p>
                </div>
                <footer className={ErrorStyles.actions}>
                    <Button onClick={props.onConfirm}>Okay</Button>
                </footer>
            </Card>
        </div>
    );
}

export default ErrorModal;