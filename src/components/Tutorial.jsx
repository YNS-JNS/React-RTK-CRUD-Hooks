import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TutorialService from '../services/TutorialService'
import LoadingSpinner from './LoadingSpinner';

const Tutorial = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [loading, setLoading] = useState(false);
  // const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [message, setMessage] = useState({
    update: "",
    remove: "",
  });
  const [error, setError] = useState({
    fetching: "",
    updateState: "",
    updateTutorial: "",
    removeTutorial: "",
  });

  const getTutorial = () => {

    setError({});

    setLoading(true);

    TutorialService.getById(id)
      .then(
        response => {
          console.log("response: ", response.data);
          setCurrentTutorial(response.data.tutorial);
        }
      )
      .catch(
        error => {
          console.log("Error retrieving tutorial from server, error: ", error);
          // setError("Error retrieving tutorial from server");
          setError({
            fetching: "Error retrieving tutorial from server",
          });
          console.log("Error message: ", response.data.message);

        }
      ).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      getTutorial();

    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTutorial({
      ...currentTutorial,
      [name]: value
    })
  }

  /** @des Update status */
  const updatePublished = (status) => {

    setError({});

    const updatedStatus = { ...currentTutorial, published: status };

    setLoading(true);

    TutorialService.update(id, updatedStatus)
      .then(
        response => {
          console.log("response after updating status: ", response.data);
          setCurrentTutorial(response.data.tutorial);

          // setTimeout(() => {
          //   setLoading(false);
          // }, 1500);
        }
      )
      .catch(
        error => {
          console.log("Error updating status, error: ", error);
          setError({
            updateState: "Error updating status",
          });
        }
      ).finally(() => setLoading(false));
  };

  /** @desc Update the tutorial */
  const updateTutorial = () => {

    // validation
    // if (!currentTutorial.title) {
    //   setError({
    //  ...error,
    //     updateTutorial: "Please enter a title"
    //   });
    //   return;
    // }

    setLoading(true);
    setError({});

    TutorialService.update(id, currentTutorial)
      .then(
        response => {
          console.log("response after updating tutorial: ", response.data);
          setCurrentTutorial(response.data.tutorial);

          // if (response.data.status_code === 200) {
          setMessage({ update: "The tutorial was updated successfully." });
          // }

          setTimeout(() => {
            setMessage("");
          }, 1500);
        }
      )
      .catch(
        error => {
          console.log("Error updating tutorial, error: ", error);
          // setMessage("Error updating Tutorial!");
          setError(
            {
              updateTutorial: "Error updating Tutorial!",
            }
          );
        }
      ).finally(() => setLoading(false));
  };

  /** @des Remove the tutorial */
  const deleteTutorial = () => {

    setError({});

    TutorialService.remove(currentTutorial.id)
      .then((response) => {
        console.log("Removed tutorial successfully", response.data);

        setMessage({ remove: "The tutorial was deleted successfully." });
        setTimeout(() => {
          setMessage("");
          navigate('/tutorials/');
        }, 1500);
      })
      .catch(err => {
        console.log("Failed to delete tutorial", err);
        setError({ removeTutorial: "Failed to delete tutorial, Please try it again!" })
      });
  }

  if (error.fetching) {
    return <>
      <div className="alert alert-danger" role="alert">
        {error.fetching}
      </div>
    </>
  }

  if (error.removeTutorial) {
    return <>
      <div className="alert alert-danger" role="alert">
        {error.removeTutorial}
      </div>
    </>
  }

  if (message.remove) {
    return <>
      <div className="alert alert-primary" role="alert">
        {message.remove}
      </div>
    </>
  }

  console.log("Update message: ", message.update);
  console.log("Remove message: ", message.remove);

  return (
    <div>
      {
        currentTutorial ? (
          <>
            <div className="edit-form m-4">
              <h4>Tutorial</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={currentTutorial.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={currentTutorial.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <strong>Status:</strong>
                  </label> {" "}
                  {currentTutorial.published ? "Published" : "Pending"}
                </div>
              </form>

              <button
                className={` ${currentTutorial.published ? "badge badge-secondary" : "badge badge-primary"} mr-2 `}
                onClick={() => updatePublished(!currentTutorial.published)}
              >
                {currentTutorial.published ? "UnPublish" : "Published"}
              </button>

              <button className="badge badge-danger mr-2"
                onClick={deleteTutorial}
              >
                Delete
              </button>

              <button
                type="submit"
                className="badge badge-success"
                onClick={updateTutorial}
              >
                Update
              </button>
              <p>{message.update}</p>
            </div>
            {error.updateState && <p className="text-danger">{error.updateState}</p>}
            {error.updateTutorial && <p className="text-danger">{error.updateTutorial}</p>}
            {loading && <LoadingSpinner />}
          </>
        )
          :
          (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>

          )
      }
    </div>
  )
}

export default Tutorial