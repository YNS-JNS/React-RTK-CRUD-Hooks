import http from '../http-common';

// _________________________________________
/** @desc get All Tutorials */
const getAll = () => {
    return http.get("/tutorials");
};

// _________________________________________
/** @desc get Tutorial by id */
const getById = (id) => {
    return http.get(`/tutorials/${id}`);
};

// _________________________________________
/** @desc create Tutorial */
const create = (data) => {
    return http.post('/tutorials', data);
};

// _________________________________________
/** @desc update Tutorial */
const update = (id, data) => {
    return http.put(`/tutorials/${id}`, data);
};

// _________________________________________
/** @desc delete Tutorial */
const remove = (id) => {
    return http.delete(`/tutorials/${id}`);
};

// _________________________________________
/** @desc delete All Tutorials */
const removeAll = () => {
    return http.delete('/tutorials');
};

// _________________________________________
/** @desc find Tutorials by title */
const findByTitle = (title) => {
    return http.get(`/tutorials?title=${title}`);
};

// _________________________________________
const TutorialService = {
    getAll,
    getById,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};

export default TutorialService;