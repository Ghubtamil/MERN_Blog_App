import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePost } from "../../Controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Alert from "../../Components/Alert";

const Update = () => {
    // use post context
    const { posts, setPosts } = useContext(PostContext);
    // use navigate hook
    const navigate = useNavigate();
    // use location hook to recive data from dashboard
    const { state } = useLocation();

    // Error state
    const [error,setError] = useState(null);
    
    // Form data state
    const [title, setTitle] = useState(state.title);
    const [body, setBody] = useState(state.body);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // update post
            const data = await updatePost(state._id, title, body);
            const updatePosts = posts.filter((post) => post._id !== state._id)
            // update the posts state
            setPosts([...updatePosts, data.post]);
            // navigate to dashboard
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <h1 className="title">Update Post</h1>

            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Post Title"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <textarea
                    rows="6"
                    placeholder="Post Content"
                    className="input "
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button className="btn">Update</button>
            </form>

            {error && <Alert msg={error} />}
        </section>
    );
};
export default Update;

