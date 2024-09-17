<template>
  <div class="login-container">
    <div class="image-container">
      <!-- Use 'require()' para referenciar a imagem da pasta assets -->
      <img :src="require('../assets/Img-blogue.jpg')" alt="Leitura Diária" class="login-image" />

    </div>
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Nome ou email de Usuário</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit" class="login-button">Sign In</button>
      </form>
    </div>
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
        const response = await axios.post('http://localhost:3000/auth/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('authToken', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 1rem;
}

.login-box {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: transform 0.3s ease;
}

.login-box:hover {
  transform: translateY(-5px);
}

h2 {
  margin-bottom: 2rem;
  color: #333;
  font-family: 'Georgia', serif;
  font-size: 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Arial', sans-serif;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.login-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  font-family: 'Arial', sans-serif;
}

.login-button:hover {
  background-color: #0056b3;
}

.image-container {
  display: none;
}

.login-image {
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
}

/* Responsive styles */
@media (min-width: 768px) {
  .login-container {
    flex-direction: row;
  }

  .image-container {
    display: block;
  }
}
</style>
