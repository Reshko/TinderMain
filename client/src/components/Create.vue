<template>
  <div>
      <h1>gg wp</h1>
      <div>
      </div>
  </div>
</template>



<script>

import PostService from "../PostService";

export default {
  data(){
    return {
      posts:[]
    }
  },
  async created(){
    try{
      this.posts = await PostService.getPosts()
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>

<style>

</style>