<template>
  <div class="home">
    <!-- Botão MENU -->
    <button class="menu-button" @click="toggleMenu">MENU</button>

    <!-- Menu lateral -->
    <div v-if="isMenuOpen" class="sidebar">
      <button @click="toggleMenu" class="close-button">X</button>
      <ul>
        <li><a href="/categories">Categorias</a></li>
        <li><a href="/authors">Autores</a></li>
        <li><a href="/favorites">Favoritos</a></li>
        <li><a href="/profile">Meu Perfil</a></li>
      </ul>
    </div>

    <!-- Conteúdo principal -->
    <div class="content">
      <BlogDashboard 
        @edit-post="editPost"
        @delete-post="deletePost"
      />
      <button @click="() => {$router.push('/login')}" class="new-post-button">Logout</button>
    </div>
  </div>
</template>

<script>
import BlogDashboard from './BlogDashboard.vue'

export default {
  name: 'HomeView',
  components: {
    BlogDashboard
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target) && this.isMenuOpen) {
        this.isMenuOpen = false;
      }
    },
    editPost(post) {
      // Logic to edit post
      console.log('Edit post:', post);
      // You can open a dialog or redirect to an edit page
    },
    deletePost(postId) {
      // Logic to delete post
      console.log('Delete post with ID:', postId);
      // You can call a method to delete the post from the server
    }
  },
  mounted() {
    window.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>
/* Estilos para o botão MENU */
.menu-button {
  background-color: #3498db; /* Azul claro */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.menu-button:hover {
  background-color: #2980b9; /* Azul escuro */
}

.menu-button:active {
  transform: scale(0.98); /* Efeito de clique */
}

/* Estilos para o botão Logout */
.new-post-button {
  background-color: #e74c3c; /* Vermelho */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.new-post-button:hover {
  background-color: #c0392b; /* Vermelho escuro */
}

.new-post-button:active {
  transform: scale(0.98); /* Efeito de clique */
}

/* Estilos para o menu lateral */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 20px 0;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.sidebar ul li a:hover {
  color: #3498db; /* Azul claro */
}

.sidebar-active {
  transform: translateX(0);
}

/* Estilos para o botão de fechar do menu */
.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
