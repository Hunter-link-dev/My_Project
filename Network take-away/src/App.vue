<template>
  <div id="app">
    <div id="nav">
      <keep-alive>
        <router-view/>
      </keep-alive>
      <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {mapActions} from 'vuex'
export default {
  components: {
    FooterGuide
  },
  mounted() {
    // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserInfo()
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  // font-family 'Avenir', Helvetica, Arial, sans-serif
  // -webkit-font-smoothing antialiased
  // -moz-osx-font-smoothing grayscale
  // text-align center
  // color #2c3e50
  // margin-top 60px
  width 100%
  height 100%
  background-color #f5f5f5
</style>
