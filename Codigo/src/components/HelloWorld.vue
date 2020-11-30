<template>

  <v-app style="background: grey">
    <!--Este v-card es la barra de navegacion superior-->
    <v-card
      app
      color="cyan"
      dark
      height="110"
    > <!--- Esto podria ponerlo como una v-app-bar y se moveria , me gusta mas pero crea un espacio vacio que no me gusta en la aplicacion asi que lo voy a dejar como v-card-->
    <!-- Con v-card no se mueve pero no hay espacio -->
      <v-toolbar dark height="110" color="cyan">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title id="game">
          <span style="font-size: 30pt; font-family: 'Helvetica'; "> <em>GameRecommendator</em></span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    
    
    

  
  </v-card>
  <!-- Este es e menu lateral-->
  <v-navigation-drawer temporary absolute v-model="drawer" class="cyan" dark>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon large>mdi-menu</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Menú</v-list-item-title>

        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense class="pa-0" flat>
        <v-list-item-group>
          <v-list-item v-for="item in items" :key="item.title" :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <!--Este es el contenedor para el buscador, los filtros y el recomendador -->
    <v-content>
      <!-- El slide de la imagen-->
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
        align="top"
        justify="top"
      >
        <v-carousel-item
          v-for="(slide, i) in this.slides"
          :key="i"
          :src="slide.src"
          :position="slide.position"
          
        >
          <v-row class="fill-height" align="center" justify="center" style="opacity:8 ; color: white; " >
            <div :class="slide.class">{{ slide.text }}</div>
          </v-row>
        </v-carousel-item>
      </v-carousel>

      <!-- El buscador-->
      <v-card color="grey lighten-4" height="100px" >
        <v-toolbar  height="100px" color="grey darken-4" dark class="centrado2" > 

          <v-toolbar-title class="centrado">
            Búsqueda por nombre:
            <v-text-field
              class="caja"
              rounded
              outlined
              dense
              label="Search"
              v-model="busqueda"
              v-on:keyup.enter="send()"
              color="cyan"
              
            ></v-text-field>
          </v-toolbar-title>

          

          
          <!--El boton de enviar-->
          <v-btn @click="send" class="mov" color="grey darken-1"  >Buscar</v-btn>

          

        </v-toolbar>
      </v-card>

      <!-- los combobox y los botones de filtro-->
      <v-card color="grey lighten-4" height="100px">

        <v-toolbar height="100px" color="grey darken-4" dark>

          <v-toolbar-title>
            Plataforma:
            <v-combobox :items="platforms" v-model="platform" outlined dense rounded @change="cambiar"></v-combobox>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-title>
            Género:
            <v-combobox :items="genres" v-model="genre" outlined dense rounded @change="cambiar"></v-combobox>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-checkbox label="Primero los mas nuevos" v-model="modern" @change="novedad"></v-checkbox>

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-btn @click="mejor" color="grey darken-1">¡Muestrame Lo Mejor!</v-btn>

        </v-toolbar>
      </v-card>

      
    </v-content>

    <!-- Este es el contenedor para los videojuegos-->
    <v-content>
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(videogame, index) in this.Videogames" v-bind:key="videogame.id"> <!-- Facil de entender una vez buscas, videogame es una instancia en la que se almacena el objeto de Videogames, el index es un segundo argumento hecho para cambiar de objeto al ser un array de objetos y finalmente el v-bind de videogame.id es un marcador particular para facilitar el orden de los objetos asignandoles un id haciendo mas facil reutilizar y reordenar los elementos. Hizo falta el this para que reconociera la instancia de los videojuegos -->
            <v-card
              elevation="18"
              style="background: #3A1C71;
    background: -webkit-linear-gradient(to right, #A195C9, #DADADA, white);
    background: linear-gradient(to right,  #A195C9, #DADADA, white);" class="cajaVideo"
            >
              <v-card-title>{{index + 1}}: {{videogame.name}}</v-card-title>
              <v-card-subtitle>
                Plataforma: {{videogame.plataforma}}
                <br />
                Año: {{videogame.release_date}}
                <br />
                Genero: {{String(videogame.genres)}}<!--M-->
                <br />
                Multijugador: {{videogame.number_players}}
                <br />
                <v-btn color="grey darken-1" class="botonLado" rounded @click="cuenta(index)" >¡Visitame!</v-btn>
                
              </v-card-subtitle>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>



  




  </v-app>
  
</template>

<script>
import VideoJuegosControl from "../Controlador/VideojuegosControl"
export default {
  data() {
    return {
      name: "home",
      busqueda: "",
      Videogames: [],
      videogamesBack: [],
      buscadorS: [],
      drawer: false,
      genre: "Cualquiera",
      platform: "Cualquiera",
      modern: false,
      slides: [
        {
          position: "center",
          text: "¡Un nuevo mundo te espera!",
          src: "https://prommorpg.ru/wp-content/uploads/2020/11/kons.jpg",
          class: "display-3"
          
        }
      ],
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/" },
        { title: "Ayuda", icon: "mdi-help", link: "/help" }
      ],
      platforms: [
        "Cualquiera",
        "PC",
        "PlayStation",
        "PlayStation 2",
        "PlayStation 3",
        "PlayStation 4",
        "PSP",
        "PS Vita",
        "SNES",
        "GameBoy",
        "GameBoy Advance",
        "Nintendo 64",
        "Nintendo Wii",
        "Nintendo DS",
        "Nintendo 3DS",
        "Wii U",
        "Xbox 360",
        "Xbox One"
      ],
      genres: [
        "Cualquiera", // si, todos
        "Deportes", //si Sports
        "Primera Persona", // si First-Person
        "Aventura", //si Adventure
        "Conducción", // si Driving
        "Rol", // si Role-Playing
        "Puzzle", //si Puzzle
        "Misceláneo", //si Miscellaneous
        "Compilación", //Compilation 
        "Simulación", //si Simulation
        "Acción", //si Action
        "Aventura De Acción", //si Action Adventure
        "RPG De Acción", //si Action RPG
        "Sci-fi", //si Sci-fi
        "Fantasia", // si Fantasy
        "Moderno", // si Modern
        "General", // si General
        "Estrategia" //si strategy
      ]
    };
  },
  mounted: async function(){ //async le dice que espere a q pase los datos
    this.Videogames= await VideoJuegosControl.getAll(); // await le dice que espere tambien como el async
    this.videogamesBack = this.Videogames ; //un respaldo con todos los videojuegos
    
    
    // Si no tiene el numero de jugadores les da 1 por defecto que es el minimo
     
    for (var v of this.Videogames) {
        if(v.number_players==undefined){
          v.number_players="1 player";
        }
       // añado las visitas a 0 de cada videojuego
        v.visita=0;
    }
    

    //console.log("Videojuego numero 52: "+this.Videogames[52].plataforma ); //prueba para ver por nodo
    this.$forceUpdate(); // fuerzo la pagina a updatear para mostrar los juegos ahora cargados
    //console.log("Genero actual: " +this.genre)
  },
  methods: {
        cambiar: function(){ //Metodo para la box de genero y plataforma
          this.Videogames=[]; // Vaciamos las muestras que salen por pantalla
          var indiceGenero = 0; var genero; var indice=0; var indicePlat= 0; var plataforma;

          switch(this.genre){ //un switch para el cambiar el genero de nombre para que la base de datos la entienda
            case "Cualquiera" :
              indiceGenero = 0;
              break;
            case "Deportes" :
              indiceGenero=1;
              genero="Sports";
              break;
            case "Primera Persona" :
              indiceGenero=1;
              genero="First-Person";
              break;
            case "Aventura" :
              indiceGenero=1;
              genero="Adventure";
              break;
            case "Conducción" :
              indiceGenero=1;
              genero="Driving";
              break;
            case "Rol" :
              indiceGenero=1;
              genero="Role-Playing";
              break;
            case "Puzzle" :
              indiceGenero=1;
              genero="Puzzle";
              break;
            case "Misceláneo" :
              indiceGenero=1;
              genero="Miscellaneous";
              break;
            case "Compilación" :
              indiceGenero=1;
              genero="Compilation";
              break;
            case "Simulación" :
              indiceGenero=1;
              genero="Simulation";
              break;
            case "Aventura De Acción" :
              indiceGenero=1;
              genero="Action Adventure";
              break;
            case "RPG De Acción" :
              indiceGenero=1;
              genero="Action RPG";
              break;
            case "Sci-fi" :
              indiceGenero=1;
              genero="Sci-fi";
              break;
            case "Fantasia" :
              indiceGenero=1;
              genero="Fantasy";
              break;
            case "Moderno" :
              indiceGenero=1;
              genero="Modern";
              break;
            case "General" :
              indiceGenero=1;
              genero="General";
              break;
            case "Estrategia" :
              indiceGenero=1;
              genero="Strategy";
              break;
            case "Acción" :
              indiceGenero=1;
              genero="Action";

          }
          //Un nuevo switch para ver la plataforma
          switch(this.platform){
            case "Cualquiera":
              indicePlat=0;
              break;
            case "PC":
              indicePlat=1;
              plataforma="PC";
              break;
            case "PlayStation":
              indicePlat=1;
              plataforma="PS";
              break;
            case "PlayStation 2":
              indicePlat=1;
              plataforma="PS2";
              break;
            case "PlayStation 3":
              indicePlat=1;
              plataforma="PS3";
              break;
            case "PlayStation 4":
              indicePlat=1;
              plataforma="PS4";
              break;
            case "PSP":
              indicePlat=1;
              plataforma="PSP";
              break;
            case "PS Vita":
              indicePlat=1;
              plataforma="VITA";
              break;
            case "SNES":
              indicePlat=1;
              plataforma="SNES";
              break;
            case "GameBoy":
              indicePlat=1;
              plataforma="GB";
              break;
            case "GameBoy Advance":
              indicePlat=1;
              plataforma="GBA";
              break;
            case "Nintendo 64":
              indicePlat=1;
              plataforma="N64";
              break;
            case "Nintendo Wii":
              indicePlat=1;
              plataforma="WII";
              break;
            case "Nintendo DS":
              indicePlat=1;
              plataforma="DS";
              break;
            case "Nintendo 3DS":
              indicePlat=1;
              plataforma="3DS";
              break;
            case "Wii U":
              indicePlat=1;
              plataforma="WIIU";
              break;
            case "Xbox 360":
              indicePlat=1;
              plataforma="X360";
              break;
            case "Xbox One":
              indicePlat=1;
              plataforma="XOne";
              
          }
          //Con estos if sabra si cambia el genero, la plataforma o los dos
          if(indiceGenero==0 && indicePlat==0){
            indice=0;
          } 
          else if(indiceGenero==1 && indicePlat==0){
            indice=1;
          }
          else if(indiceGenero==0 && indicePlat==1 ){
            indice=2;
          }
          else{
            indice=3;
          }
          //En este switch se mete una vez sabe con cuanto debe operar
          switch(indice){

            case 0: //En caso de que quieras ver todos vuelve al array original
              this.Videogames = this.videogamesBack;
              break;
            case 1: //Solo muestra los juegos con el genero elegido
              for (var v of this.videogamesBack) {
                if(v.genres == genero){
                  //console.log(v.genres);
                  this.Videogames.push(v);
                }
              }
              break;
            case 2: // muestra los juegos con la plataforma elegida
              for (var ve of this.videogamesBack) {
                if(ve.plataforma == plataforma){
                  this.Videogames.push(ve);
                }
              }
              break;
            case 3: // muestra los juegos con la plataforma y generos deseados
              for (var ver of this.videogamesBack) {
                if(ver.plataforma == plataforma && ver.genres == genero){
                  this.Videogames.push(ver);
                }
              }



        }
    
        },

        novedad: function (){ //Por algun motivo al hacerlo en el caso de cualquiera cualquiera se queda asi a pesar de que el back up no se deberia ver afectado
            //Ordena los videojuegos por fecha de mas nuevo a mas viejo

            //Solo muestra los mas nuevos si esta activo .
            if(this.modern==true){
                this.Videogames.sort(function(a,b) {
                var KeyA = new Date(a.release_date), //primer argumento
                KeyB = new Date(b.release_date);  //segundo argumento
                //Ahora los compara
                if (KeyA > KeyB) return -1;
                if (KeyA < KeyB) return 1;
                return 0;
              });
            }
            
          
        },

        mejor: function(){ // La funcion que usa para recomendar los juegos por nota
         
          //Crea la nota de cada videojuego, la cual almacena en cada videojuego y las usa para ordenarlos
          this.Videogames.forEach((a)=>{ var nota = (Number(a.user_score) + Number(a.metaescore) + Number(a.visita * 2)) ;a.nota = nota }) // Por cada juego en Videogames coge la nota de usuario , la de metascore y el numero de veces visitado multiplicado por 2, las transforma en numeros ya que son objetos y los suma , despues los añade a una nueva propiedad que sera nota
          
          //El sort para ordenar los videojuegos por nota
          this.Videogames.sort(function(a,b) { // Coloca por nota los juegos de mayor a menor
              var KeyA = new Number(a.nota), //primer argumento
              KeyB = new Number(b.nota);  //segundo argumento
              //Ahora los compara
              if (KeyA > KeyB) return -1;
              if (KeyA < KeyB) return 1;
              return 0;
            });
        },

        send: function(){ // Funcion del boton send que coge los datos de la barra, es el buscador
          
          //Invocando antes a la funcion cambiar logro que Videogames carge los juegos de la categoria y plataformas correctas
          this.cambiar()
          //Almacena el buscador actual en un nuevo array para que busque en la categoria actual
          this.buscadorS = this.Videogames;
          //Vaciamos el nodo
          this.Videogames=[];
          //pushea todo aquel juego que contenga las palabras encontradas en el buscador, en el mismo orden
          for (var v of this.buscadorS) {
                if(this.busqueda.toUpperCase() == String(v.name).substring(0,this.busqueda.length).toUpperCase()){
                  this.Videogames.push(v);
                }
          }
          //Si no encuentra ningun juego devuelve esto como si fuese un nodo de videojuegos
          if(this.Videogames.length==0){
            this.Videogames.push({
              name: "No se ha encontrado ningun Juego."
            })
          }

        },

        cuenta: function(intValue){
           //Anade 1 visita por cada vez que se le da al boton del juego
           this.Videogames[intValue].visita= this.Videogames[intValue].visita+1;
           //console.log(this.Videogames[intValue].visita);
        }


  }
  



}
  </script>

  <style>
    .mov{
      margin:80px;
    }
    .caja{
      width:500px;
      text-align:center;
      align-content: center;
      margin-left: 20%;
       
      
    }
    .centrado{
      align-self: center;
      align-items: center;
      
    }
    .centrado{
      align-self: center;
      align-items: center;
      margin-left: 30%;
    }
    .botonLado{
      align-items: right;
      align-self: right;
      margin-left: 75%;
      
    }
    .cajaVideo{
      width: 500px;
    }
  </style>
