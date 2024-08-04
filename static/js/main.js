document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const newPostForm = document.getElementById('new-post-form');
    const editPostForm = document.getElementById('edit-post-form');
    const commentForm = document.getElementById('comment-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
  
        if (username && password) {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/dashboard'); 
          } else {
            alert('Failed to log in');
          }
        }
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
  
        if (username && password) {
          const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/dashboard'); 
          } else {
            alert('Failed to sign up');
          }
        }
      });
    }
  
    const logout = document.getElementById('logout');
    if (logout) {
      logout.addEventListener('click', async () => {
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/'); 
        } else {
          alert('Failed to log out');
        }
      });
    }
  
    if (newPostForm) {
      newPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
  
        if (title && content) {
          const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            const result = await response.json();
            alert(result.message || 'Failed to create post');
          }
        }
      });
    }
  
    if (editPostForm) {
      editPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.querySelector('input[name="post-id"]').value;
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
  
        if (title && content) {
          const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            const result = await response.json();
            alert(result.message || 'Failed to update post');
          }
        }
      });
    }
  
    const deleteButtons = document.querySelectorAll('.delete-post');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id');
  
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          const result = await response.json();
          alert(result.message || 'Failed to delete post');
        }
      });
    });
  
    if (commentForm) {
      commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const postId = window.location.pathname.split('/').pop();
        const content = document.getElementById('comment').value.trim();
  
        if (content) {
          const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ post_id: postId, content }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            const result = await response.json();
            alert(result.message || 'Failed to add comment');
          }
        }
      });
    }
  });