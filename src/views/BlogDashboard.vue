<template>
  <div>
    <div class="dashboard-container">
      <h1>Blog Dashboard</h1>
      <button @click="showDialog = true" class="new-post-button">Novo Post</button>
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
    </div>
    <div v-if="showDialog" class="dialog-overlay" @click.self="showDialog = false">
      <div class="dialog-box">
        <h2>Novo Post</h2>
        <form @submit.prevent="createPost">
          <div class="input-group">
            <label for="title">Title</label>
            <input type="text" v-model="newPost.title" id="title" required />
          </div>
          <div class="input-group">
            <label for="subtitle">Subtitle</label>
            <input type="text" v-model="newPost.subtitle" id="subtitle" required />
          </div>
          <div class="input-group">
            <label for="text">Text</label>
            <textarea v-model="newPost.text" id="text" rows="4" required></textarea>
          </div>
          <div class="input-group">
            <label for="likes">Likes</label>
            <input type="number" v-model="newPost.likes" id="likes" min="0" required />
          </div>
          <div class="input-group">
            <label for="dislikes">Dislikes</label>
            <input type="number" v-model="newPost.dislikes" id="dislikes" min="0" required />
          </div>
          <button type="submit" class="submit-button">Submeter</button>
        </form>
        <button @click="showDialog = false" class="close-button">Fechar</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'BlogDashboard', // Atualize o nome do componente se necessário
  data() {
    return {
      posts: [],
      showDialog: false,
      newPost: {
        title: '',
        subtitle: '',
        text: '',
        likes: 0,
        dislikes: 0
      }
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
      try {
        const payload = this.newPost;

        this.newPost = {
          title: '',
          subtitle: '',
          text: '',
          likes: 0,
          dislikes: 0
        }

        await axios.post('http://localhost:3000/blog/posts', payload);
        await this.fetchPosts(); // Adicione 'await' para garantir que a chamada seja concluída
        this.showDialog = false
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

/* Dialog */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  position: relative;
}

.new-post-button {
  display: block;
  margin: 0 auto 2rem auto;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.new-post-button:hover {
  background-color: #0056b3;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus, textarea:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.submit-button:hover {
  background-color: #0056b3;
}

.close-button {
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close-button:hover {
  color: #007bff;
}
</style>