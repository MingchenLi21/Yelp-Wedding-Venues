import Alert from 'react-bootstrap/Alert'
import Col from "react-bootstrap/Col";

const LoginFirst = ()=>{
    return (
        <Col md={ { span: 8, offset: 2 } }>
        <Alert variant="warning">
            Please login or 
            <Alert.Link href="/register" > register </Alert.Link> First!
        </Alert>
        </Col>
    );
};

export default LoginFirst;