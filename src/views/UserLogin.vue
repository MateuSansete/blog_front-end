<template>
  <div>
    <h2>UserLogin</h2>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });
        // Armazene o token no localStorage ou em um estado gerenciado
        localStorage.setItem('authToken', response.data.token); // Ajuste conforme necessário
        this.$router.push('/dashboard'); // Redirecionar para a dashboard após o login
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }
};
</script>

