import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost/cinema",
});

const multiPartConfig = {
    headers: {
        'content-type': 'multipart/form-data'
    },
}
const deleteProjection = (id) => api.post(`/projections/delete/${id}`)
const createProjection = (projection, config = multiPartConfig) => {
    return api.post('/projections', projection, config);
};

export {deleteProjection, createProjection};
