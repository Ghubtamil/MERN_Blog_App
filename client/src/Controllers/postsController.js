// ************get all posts************

const getPosts = async () => {
  const res = await fetch("/api/posts");
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

// ******************************get user post *******************

const getUserPosts = async () => {
  const res = await fetch("/api/posts/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

// ******************************Create user post *******************

const createPost = async (title, body) => {
  if (!title || !body) {
    throw new Error("All fields are required");
  }

  const res = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();

  if (!res.ok) {
      throw Error(data.error);
  }

  return data;
};

// ****************************** Delete user post *******************

const deletePost = async (_id) => {
  const res = await fetch(`/api/posts/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};
// ****************************** Update user post *******************
const updatePost = async (_id, title, body) => {
  if (!title || !body) {
    throw Error("All fields are required");
  }

  const res = await fetch(`/api/posts/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};
//****************************************************************************************************
export { getPosts, getUserPosts, createPost, deletePost, updatePost };
