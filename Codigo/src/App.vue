<template>
  <v-app>
    

    <v-main >
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => {
    return {
      items: [
          { title: "Inicio", icon: "mdi-home", link: "/" },
          { title: "Ayuda", icon: "mdi-help", link: "/help" }
        ]
      }
  },
  
};
</script>
