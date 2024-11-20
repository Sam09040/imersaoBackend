import getTodosPosts from "../models/postsModel.js";

export const listarPosts = async (req, res) => {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
};

export default listarPosts;
