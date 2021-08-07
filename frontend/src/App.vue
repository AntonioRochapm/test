<template>
  <div>
    <the-header title="Morim Rocha"></the-header>
    <contact-form></contact-form> 
    <contact-management></contact-management>  
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import ContactManagement from './components/contact-list/ContactsManagement.vue'
import ContactForm from './components/contact-list/ContactForm.vue'

export default {
  name: 'App',
  components: {
    'the-header': TheHeader,
    'contact-management': ContactManagement,
    'contact-form': ContactForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
