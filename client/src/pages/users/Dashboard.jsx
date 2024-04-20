import { useContext, useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../Controllers/postsController";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import Post from "../../Components/Post";
import Alert from "../../Components/Alert";
import Success from "../../Components/Success";

const Dashboard = () => {
  // use user context
  const { user, setUser } = useContext(UserContext);

  // loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);

  // success state
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      // Grab user's post
      const { userPosts, email } = await getUserPosts();
      // update user state
      setUser({ email, posts: userPosts });
      setLoading(false);
    }, 500);
  }, []);
  // handle delete post
  const handleDelete = async (_id) => {
    if (confirm("Confirm delete?")) {
      try {
        // delete post
        const data = await deletePost(_id);
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }

      const newPosts = user.posts.filter((post) => post._id !== _id);
      setUser({ ...user, posts: newPosts });
    }
  };

  return (
    <section className="card">
      <p>{user.email}</p>
      <h1 className="title">User Dashboard</h1>

      {loading && (
        
        <i className="fa-solid fa-fan animate-spin text-5xl text-center block"></i>
        
      )}

      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}

      {user.posts &&
        user.posts.map((post) => (
          <div key={post._id}>
            <Post post={post}>
              <div className="flex items-center gap-2">
                <Link
                  className="fa-solid fa-pen-to-square nav-link
                text-green-500 hover:bg-gray-300"
                  title="Update"
                  state={post} // send the posts to the update page 
                  to={"/update"}
                ></Link>

                <button
                  className="fa-solid fa-trash-can  nav-link
                text-red-500 hover:bg-gray-300"
                  title="Delete"
                  onClick={() => handleDelete(post._id)}
                ></button>
              </div>
            </Post>
          </div>
        ))}
    </section>
  );
};
export default Dashboard;
