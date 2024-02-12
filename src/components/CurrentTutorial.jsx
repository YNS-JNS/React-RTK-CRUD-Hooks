import React from 'react'
import { Link } from 'react-router-dom';

const CurrentTutorial = ({ currentTutorial }) => {

    const { id, title, description, published } = currentTutorial;

    return (
        <div>
            <h4>Tutorial</h4>
            <div>
                <label>
                    <strong>Title:</strong>
                </label>{" "}
                {title}
            </div>
            <div>
                <label>
                    <strong>Description:</strong>
                </label>{" "}
                {description}
            </div>
            <div>
                <label>
                    <strong>Status:</strong>
                </label>{" "}
                {published ? "Published" : "Pending"}
            </div>

            <Link
                to={`/tutorials/${id}`}
                className="badge badge-warning"
            >
                Edit
            </Link>
        </div>
    )
}

export default CurrentTutorial