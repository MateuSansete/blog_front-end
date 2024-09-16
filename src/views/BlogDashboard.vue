<template>
  <div>
    <h2>BlogDashboard</h2>
    <div class="scrollview">
      <div v-for="post in posts" :key="post.id" class="card">
        <h3>{{ post.title }}</h3>
        <h4>{{ post.subtitle }}</h4>
        <p>{{ post.text }}</p>
        <div>
          Likes: {{ post.likes }} | Dislikes: {{ post.dislikes }}
        </div>
        <button @click="editPost(post.id)">Edit</button>
        <button @click="deletePost(post.id)">Delete</button>
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
