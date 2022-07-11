import Button from "react-bootstrap/Button";

const DeleteBtn = ( { handleDelete } ) => {

    return (
        <Button variant="danger"
            onClick={ handleDelete }
        >
            Delete
        </Button>
    );
};
export default DeleteBtn;