import Alert from 'react-bootstrap/Alert'
import Col from "react-bootstrap/Col";
import useShowMsg from './Hooks/useShowMsg';
import Row from "react-bootstrap/Row";

const MyAlert = () => {
    const { msg, dismiss } = useShowMsg();
    const { showAlert, alertMsg, alertType } = msg;
    if ( showAlert ) {
        return (
                <Row className="justify-content-md-center">
                    <Col md={ { span: 8} }>
                        <Alert variant={ alertType } onClose={ () => dismiss() } dismissible>
                            { alertMsg }
                        </Alert>
                    </Col>
                </Row>
        )

    }
    return (
        <></>
    );
};

export default MyAlert;