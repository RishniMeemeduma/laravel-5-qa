<template>
    <div class="spinner">
      <div class="fa fa-spinner fa-spin" :class="sizeClass" :style="getMinWidth">
      </div>
    </div>
</template>
<style scoped>
.spinner{
    color:#ddd;
    text-align:center
}
</style>
<script>
export default {
  props:{
    small:{Boolean, default : false},
    minWidth: {Number, default:109.61}
  },
  computed:{
    sizeClass(){
      this.small ? '':'fa-3x'
    },
    getMinWidth(){
      return {
        minWidth: this.minWidth +'px'
      } 
    }
  }
}
</script>