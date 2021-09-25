const { api } = require('../services/api');

exports.getAllPosts = () => api.get('/posts');

exports.getAllComments = (id) => api.get(`/posts/${id}/comments`)