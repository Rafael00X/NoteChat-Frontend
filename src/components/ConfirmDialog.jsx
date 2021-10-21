import React from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmDialog(props) {
    const { title, body, callback, state } = props;
    const [show, setShow] = state;

    const handleClose = () => {
        setShow(false);
    };

    const handleConfirm = () => {
        callback();
        setShow(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmDialog;
