<template>
  <div>
    <div class="container">
      <div class="block">
        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenter">
          Add
        </button>
      </div>

      <div class="input">
        <input type="text" class="form-control" id="search" aria-describedby="emailHelp" placeholder="Enter person" size="52">
      </div>
       
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <!-- МОД ОКНО -->
            <div class="modal-body">
                <form>
                  <div class="form-group">
                      <input type="file" class="form-control"  @change="onFileLoad" id="inputname">
                  </div>  
                </form>
            </div>
            <div class="modal-footer">
                <button  type="button" class="btn btn-primary" >Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" >
      <table class="table" >
      <thead>
          <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Path</th>
          <th scope="col">Type</th>
          <th scope="col">Changes</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(post, index) in posts" v-bind="post" v-bind:index="index" v-bind:key="post._id">
              <td>{{++index}}</td>
              <td><img :src="post.text" alt="" height="100" style="max-width: 120px"></td>
              <!-- <td><img :src="post.text" alt="" height="100" class="rounded-circle"></td> -->
              <td>{{post.text}}</td>
              <td>{{post.about}}</td>
              <td><button type="button" class="btn btn-danger" v-on:click="deletePost(post._id)">Delete</button></td>
          </tr>
      </tbody>
      </table>
    </div>

    <!-- <div class="post"
          v-for="(post,index) in posts"
          v-bind="post"
          v-bind:index="index"
          v-bind:key="post._id"
        >
        <img :src="post.text" alt="" height="100" style="max-width: 120px">
        <button type="button" class="btn btn-danger" v-on:click="deletePost(post._id)">Delete</button>
    </div> -->
  </div>
</template>

<script>

import PostService from "../PostService";

export default {
  name: 'HelloWorld',
  data(){
    return {
      posts:[] // Целый объект ,который приходит от сервер
    }
  },
  async created(){
    try{
      this.posts = await PostService.getPosts()
    } catch(err) {
      this.error = err.message;
    }
  },
  methods:{
    async createPost(){
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts()
    },
    async deletePost(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts()
    },
    onFileLoad(event){
      console.log(event);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  padding-top: 5px;
  padding: 5px;
  padding-left: 20px;
}
th{
  padding-left: 20px;
}
.block{
  display: inline-block;
}
.input{
  display: inline-block;
  padding: 10px;
}
</style>
