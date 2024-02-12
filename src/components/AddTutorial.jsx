import React from 'react'
import { useState } from 'react';
import TutorialService from '../services/TutorialService';
import '../styles/styles.css'
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

const AddTutorial = () => {

    const initialTutorialState = {
        title: "",
        description: "",
        published: false,
    };

    // First, we define and set initial state: tutorial & submitted
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        title: "",
        description: "",
        response: "",
    });


    // function to track the values of the input and set that state for changes
    const handleInputChange = (event) => {

        const { name, value } = event.target;

        setTutorial(
            {
                ...tutorial,
                [name]: value
            }
        );
    }

    const saveTutorial = () => {

        // Validation
        if (!tutorial.title) {
            setError({
                // ...error,
                title: "Title is required"
            });
            return;
        };

        if (!tutorial.description) {
            setError({
                // ...error,
                description: "Description is required"
            });
            return;
        }

        setLoading(true);

        let data = {
            title: tutorial.title,
            description: tutorial.description,
        };

        TutorialService.create(data)
            .then((response) => {
                setTutorial(response.data.tutorial);
                console.log("from console: ", response.data);
                // setSubmitted(true);
                setError({});

                setTimeout(() => {
                    setSubmitted(true);
                    setLoading(false);
                }, 1500);

            })
            .catch((e) => {
                console.log(e.message);
                setError({
                    // ...error,
                    response: "error occurred while saving the tutorial, please try again!"
                });
                setLoading(false);
                setSubmitted(true);
            });


    };

    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setSubmitted(false);
    }

    return (
        <div className='form_add_tutorial d-flex justify-content-center align-items-center'>
            <div className='submit-form w-75 p-4'>
                {
                    submitted ? (
                        <div>
                            {
                                error.response ?
                                    (
                                        <>
                                            <div className="alert alert-danger" role="alert">
                                                {error.response}
                                            </div>
                                            <Link to={'/'} >
                                                <button className="btn btn-primary">
                                                    Return
                                                </button>
                                            </Link>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <h4>You submitted successfully!</h4>
                                            <button className="btn btn-success" onClick={newTutorial}>
                                                Add
                                            </button>
                                        </>
                                    )
                            }

                        </div>
                    ) : (
                        <div>
                            <h1>Add a new tutorial</h1>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={tutorial.title}
                                    onChange={handleInputChange}
                                    name="title"
                                />
                                {error.title && <p className="text-danger">{error.title}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={tutorial.description}
                                    onChange={handleInputChange}
                                    name="description"
                                />
                                {error.description && <p className="text-danger">{error.description}</p>}
                            </div>

                            <button onClick={saveTutorial} className="btn btn-success">
                                Submit
                            </button>
                            {loading && <LoadingSpinner />}
                            {/* {error.response && <p className="text-danger">{error.response}</p>} */}

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AddTutorial