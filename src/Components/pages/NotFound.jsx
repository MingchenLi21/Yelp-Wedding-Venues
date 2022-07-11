import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>That page cannot be found...</h2>
            <Link to={"/"}>Go to homepage</Link>
        </div>
    );
}

export default NotFound;