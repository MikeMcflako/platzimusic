<template lang="pug">
  #app
    img(src='https://mikemcflako.github.io/platzimusic/assets/logo.png')
    h1 Platzi Music
    select(v-model="selectedCountry")
      option(v-for="country in countries" :value="country.value") {{country.name}}
    spinner(v-show="loading")
    ul
      artist(v-for="artist in artists" :artist="artist" :key="artist.mbid")
</template>

<script>
import Artist from './components/artist.vue';
import Spinner from './components/spinner.vue';
import getArtists from './api'
export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        {
          name: 'México',
          value: 'mexico'
        },
        {
          name: 'Andorra',
          value: 'andorra'
        },
        {
          name: 'Luxemburgo',
          value: 'luxembourg'
        }
      ],
      selectedCountry: 'mexico',
      loading: true
    }
  },
  components: {
    Artist,
    Spinner
  },
  methods: {
    refreshArtists(){
      const self = this;
      this.loading=true;
      this.artists=[]
      getArtists(this.selectedCountry)
        .then(function(artists){
          self.artists=artists;
          self.loading=false
        })
    }
  },
  mounted(){
    this.refreshArtists()
  },
  watch: {
    selectedCountry(){
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus" scoped>
#app 
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
	margin-top 60px
h1, h2 
	font-weight normal
ul 
  list-style-type none
	padding 0
li 
	display inline-block
	margin 0 10px
a 
	color #42b983
</style>
