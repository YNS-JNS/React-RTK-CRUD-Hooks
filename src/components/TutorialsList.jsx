import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import TutorialService from '../services/TutorialService';
import CurrentTutorial from './CurrentTutorial';
import LoadingSpinner from './LoadingSpinner';

const TutorialsList = () => {

  /* _____________________________________________________ */
  // Global States: 
  const [searchTitle, setSearchTitle] = useState("");
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  /* _____________________________________________________ */

  /** @desc Retrieve all tutorials */
  const retrieveTutorials = () => {
    setLoading(true);
    TutorialService.getAll()
      .then(response => {

        console.log("response: ", response.data);

        setTimeout(() => {
          setTutorials(response.data.tutorials);
          setLoading(false);
        }, 1500);

      })
      .catch(error => {
        console.log("Error getting tutorials from server, error: ", error);
        setError('Error getting tutorials from server');
        setLoading(false);
      });
  }

  /* _____________________________________________________ */

  /** @desc useEffect() to fetch the data from the Web API. This Hook tells React that the component needs to do something after render or performing the DOM updates. In this effect, we perform data fetching from API. */
  useEffect(() => {

    retrieveTutorials();
  }, []);

  /* _____________________________________________________ */

  /** @desc Set active tutorial */
  const setActiveTutorial = (tutorial, index) => {

    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
    // console.log("Index: " + index);
    // console.log("Tutorial: " + JSON.stringify(tutorial));
  };

  /* _____________________________________________________ */

  /** @desc Search input changes */
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);

    // todo: Perform an instant search
    findByTitle(searchTitle);
  }

  /* _____________________________________________________ */

  /** @desc Search for tutorial */
  const findByTitle = (searchTerm) => {
    TutorialService.findByTitle(searchTerm)
      .then(
        response => {
          setTutorials(response.data.tutorials);
          console.log("response: ", response.data);
        }
      )
      .catch(
        error => console.log("Error searching tutorials from server, error: ", error)
      );
  }

  /* _____________________________________________________ */

  // Clearing:
  const refreshList = () => {
    setSearchTitle("");
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  }

  /* _____________________________________________________ */

  /** @desc Remove all tutorial */
  const removeAllTutorials = () => {

    setLoading(true);

    TutorialService.removeAll()
      .then(
        response => {
          console.log("response: ", response.data);
          refreshList();

          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      )
      .catch(
        error => console.log("Error removing all tutorials from server, error: ", error)
      );
  }

  /* _____________________________________________________ */

  if (error) {

    return <>
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </>
  }


  return (
    <div className="list row">
      {/* 1- col Search bar */}
      <div className="col-md-12 p-4">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner />}

      {
        tutorials.length > 0 ? (
          <>
            {/* 2- col tutorial list */}
            <div className="tutorial_list col-md-6 p-4">
              <h4>Tutorials List</h4>
              <ul className="list-group">
                {
                  tutorials &&
                  (
                    tutorials.map((tutorial, index) => (
                      <li key={index}
                        className={`list-group-item ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setActiveTutorial(tutorial, index)}
                      >
                        {tutorial.title}
                      </li>
                    ))
                  )
                }
              </ul>
              <button className="m-3 btn btn-sm btn-danger"
                onClick={removeAllTutorials}
              >
                Remove All
              </button>
            </div>

            {/* 3- col tutorial selected */}
            <div className="tutorial_selected col-md-6 p-4">
              {
                currentTutorial ? (
                  <CurrentTutorial currentTutorial={currentTutorial} />
                ) : (
                  <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                  </div>
                )
              }

            </div>
          </>
        ) : (
          <div>
            <br />
            <p>there is no tutorial, please create one</p>
          </div>
        )
      }

    </div>
  )
}

export default TutorialsList;