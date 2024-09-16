<template>
  <div class="dashboard-container">
    <h1>Blog Dashboard</h1>
    <div class="card-container">
      <div class="card" v-for="(post, index) in posts" :key="index">
        <h2>{{ post.title }}</h2>
        <h4>{{ post.subtitle }}</h4>
        <p>{{ post.text }}</p>
        <div class="reaction">
          <button @click="post.likes++">👍 {{ post.likes }}</button>
          <button @click="post.dislikes++">👎 {{ post.dislikes }}</button>
        </div>
      </div>
    </div>
    <button @click="createPost">Add New Post</button>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'BlogDashboard', // Atualize o nome do componente se necessário
  data() {
    return {
      posts: []
    };
  },
  async created() {
    await this.fetchPosts(); // Adicione 'await' para garantir que a chamada seja concluída antes de continuar
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/blog/posts');
        this.posts = response.data; // Certifique-se de que 'response' é utilizado
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    },
    async createPost() {
      const newPost = {
        title: 'Novo Post',
        subtitle: 'Subtítulo aqui',
        text: 'Conteúdo do post aqui...',
        likes: 0,
        dislikes: 0
      };
      try {
        await axios.post('http://localhost:3000/blog/posts', newPost);
        await this.fetchPosts(); // Adicione 'await' para garantir que a chamada seja concluída
      } catch (error) {
        console.error('Error creating post', error);
      }
    },
    async editPost(id) {
      const updatedPost = {
        title: 'Título atualizado',
        subtitle: 'Subtítulo atualizado',
        text: 'Texto atualizado',
        likes: 10, // ou outra lógica para capturar dados
        dislikes: 1
      };
      try {
        await axios.put(`http://localhost:3000/blog/posts/${id}`, updatedPost);
        await this.fetchPosts(); // Adicione 'await' para garantir que a chamada seja concluída
      } catch (error) {
        console.error('Error updating post', error);
      }
    },
    async deletePost(id) {
      try {
        await axios.delete(`http://localhost:3000/blog/posts/${id}`);
        await this.fetchPosts(); // Adicione 'await' para garantir que a chamada seja concluída
      } catch (error) {
        console.error('Error deleting post', error);
      }
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 0.5rem;
}

h4 {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.reaction {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
  transition: color 0.2s ease;
}

button:hover {
  color: #007bff;
}

button:focus {
  outline: none;
}
</style>