import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../Controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Post from "../../Components/Post";

const Home = () => {
  // use post context
  const { posts, setPosts } = useContext(PostContext);

  // loading state
  const [loading, setLoading] = useState(true);

  // grab all the posts on page load
  useEffect(() => {
    setTimeout(async () => {
      // grab all posts
      const data = await getPosts();
      // update posts state
      setPosts(data.posts);
      // remove the loading
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="card">
      <h1 className="title">Latest Post</h1>

      {loading && (
        <i class="fa-solid fa-spinner animate-spin text-5xl text-center block"></i>
      )}

      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
    </section>
  );
};

export default Home;
