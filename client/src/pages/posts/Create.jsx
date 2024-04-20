import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../Controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Alert from "../../Components/Alert";

const Create = () => {
  //use post context
  const { posts, setPosts } = useContext(PostContext);

  // use navigate hook
  const navigate = useNavigate();

  // error state
  const [error, setError] = useState(null);

  // form data
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // create a new post
      const data = await createPost(title, body);

      // update the posts state
      setPosts([...posts, data.post]);

      // navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Create a new post</h1>

      <form onSubmit={handleCreate}>
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
        ></textarea>
        <button className="btn">Create</button>
      </form>

      {error && <Alert msg={error} />}
      
    </section>
  );
};
export default Create;
