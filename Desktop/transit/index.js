// document.addEventListener("DOMContentLoaded", () => {
//     const blogPostsContainer = document.getElementById("blog-posts");
//     const addButton = document.getElementById("add-button");
//     const editForm = document.getElementById("edit-form");
//     const editTitle = document.getElementById("edit-title");
//     const editContent = document.getElementById("edit-content");
//     const updatePostButton = document.getElementById("update-post");
  
//     let editingPostId = null;
  
//     // Fetch and display blog posts
//     async function fetchPosts() {
//       try {
//         const response = await fetch("http://localhost:3000/posts");
//         const posts = await response.json();
//         displayPosts(posts);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     }
  
//     function displayPosts(posts) {
//       blogPostsContainer.innerHTML = "";
//       posts.forEach((post) => {
//         const postElement = document.createElement("div");
//         postElement.className = "blog-post";
//         postElement.innerHTML = `
//           <h3>${post.title}</h3>
//           <p>${post.content}</p>
//           <p><strong>Author:</strong> ${post.author}</p>
//           <button class="edit-btn" data-id="${post.id}">Edit</button>
//           <button class="delete-btn" data-id="${post.id}">Delete</button>
//         `;
//         blogPostsContainer.appendChild(postElement);
//       });
  
//     }
  
//     // Handle edit post
//     function handleEdit(event) {
//       editingPostId = event.target.dataset.id;
//       const postElement = event.target.parentElement;
//       const title = postElement.querySelector("h3").textContent;
//       const content = postElement.querySelector("p").textContent;
  
//       editTitle.value = title;
//       editContent.value = content;
//       editForm.style.display = "block";
//     }
  
//     // Update post
//     updatePostButton.addEventListener("click", async () => {
//       const updatedTitle = editTitle.value;
//       const updatedContent = editContent.value;
  
//       if (!updatedTitle || !updatedContent) return;
  
//       try {
//         const response = await fetch(`http://localhost:3000/posts/${editingPostId}`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title: updatedTitle,
//             content: updatedContent,
//           }),
//         });
  
//         if (response.ok) {
//           fetchPosts();
//           editForm.style.display = "none";
//         } else {
//           console.error("Failed to update the post.");
//         }
//       } catch (error) {
//         console.error("Error updating post:", error);
//       }
//     });
  
//     // Handle delete post
//     async function handleDelete(event) {
//       const postId = event.target.dataset.id;
  
//       try {
//         const response = await fetch(`http://localhost:3000/posts/${postId}`, {
//           method: "DELETE",
//         });
  
//         if (response.ok) {
//           fetchPosts();
//         } else {
//           console.error("Failed to delete the post.");
//         }
//       } catch (error) {
//         console.error("Error deleting post:", error);
//       }
//     }
  
//     // Handle add blog post
//     addButton.addEventListener("click", async () => {
//       const title = prompt("Enter the blog title:");
//       const content = prompt("Enter the blog content:");
//       const author = prompt("Enter the author name:");
  
//       if (!title || !content || !author) return;
  
//       const newPost = {
//         title,
//         content,
//         author,
//         date: new Date().toISOString().split("T")[0],
//         comments: [],
//       };
  
//       try {
//         const response = await fetch("http://localhost:3000/posts", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newPost),
//         });
  
//         if (response.ok) {
//           fetchPosts();
//         } else {
//           console.error("Failed to add the new post.");
//         }
//       } catch (error) {
//         console.error("Error adding post:", error);
//       }
//     });
  
//     // Handle form submission to the users route
//     const form = document.querySelector("form");
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
  
//       const formData = {
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         type: document.getElementById("type").value,
//         destination: document.getElementById("destination").value,
//         message: document.getElementById("message").value,
//       };
  
//       try {
//         const response = await fetch("http://localhost:3000/users", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });
  
//         if (response.ok) {
//           alert("Form submitted successfully!");
//           form.reset();
//         } else {
//           alert("Failed to submit form.");
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//       }
//     });
  
//     // Initial fetch to load blog posts
//     fetchPosts();
//   });
  
document.addEventListener("DOMContentLoaded", () => {
    const blogPostsContainer = document.getElementById("blog-posts");
    const addButton = document.getElementById("add-button");
    const editForm = document.getElementById("edit-form");
    const editTitle = document.getElementById("edit-title");
    const editContent = document.getElementById("edit-content");
    const updatePostButton = document.getElementById("update-post");

    let editingPostId = null;

    // Fetch and display blog posts
  function fetchPosts() {
      fetch("http://localhost:3000/posts");
      .then(response => {
        const posts = response.json()
        displayPosts(posts);
      })
            
       
    }

    function displayPosts(posts) {
        blogPostsContainer.innerHTML = "";
        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.className = "blog-post";
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p><strong>Author:</strong> ${post.author}</p>
                <button class="edit-btn" data-id="${post.id}">Edit</button>
               <button class="delete-btn" data-id="${post.id}">Delete</button>
            `;
            blogPostsContainer.appendChild(postElement);
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", handleEdit);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", handleDelete);
        });
    }

    // Handle edit post
    function handleEdit(event) {
        editingPostId = event.target.dataset.id;
        const postElement = event.target.parentElement;
        const title = postElement.querySelector("h3").textContent;
        const content = postElement.querySelector("p").textContent;

        editTitle.value = title;
        editContent.value = content;
        editForm.style.display = "block";
    }

    // Update post
    updatePostButton.addEventListener("click", async () => {
        const updatedTitle = editTitle.value;
        const updatedContent = editContent.value;

        if (!updatedTitle || !updatedContent) return;

        try {
            const response = await fetch(`http://localhost:3000/posts/${editingPostId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    content: updatedContent,
                }),
            });

            if (response.ok) {
                fetchPosts();
                editForm.style.display = "none";
            } else {
                console.error("Failed to update the post.");
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
    });

    // Handle delete post
    async function handleDelete(event) {
        const postId = event.target.dataset.id;

        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchPosts();
            } else {
                console.error("Failed to delete the post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    // Handle add blog post
    addButton.addEventListener("click", async () => {
        const title = prompt("Enter the blog title:");
        const content = prompt("Enter the blog content:");
        const author = prompt("Enter the author name:");

        if (!title || !content || !author) return;

        const newPost = {
            title,
            content,
            author,
            date: new Date().toISOString().split("T")[0],
            comments: [],
        };

        try {
            const response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                fetchPosts();
            } else {
                console.error("Failed to add the new post.");
            }
        } catch (error) {
            console.error("Error adding post:", error);
        }
    });

    // Handle form submission to the users route
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            type: document.getElementById("type").value,
            destination: document.getElementById("destination").value,
            message: document.getElementById("message").value,
        };

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Form submitted successfully!");
                form.reset();
            } else {
                alert("Failed to submit form.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    });

    // Initial fetch to load blog posts
    fetchPosts();
});
