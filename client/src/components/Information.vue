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
                      <input type="text" class="form-control" id="inputname" placeholder="Наименование" v-model="name">
                  </div>
                  <div class="form-group">
                      <input type="text" class="form-control" id="inputsurname" placeholder="Описание программы" v-model="about">
                  </div>  
                </form>
            </div>
            <div class="modal-footer">
                <button  type="button" class="btn btn-primary" v-on:click="createPost" >Save</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
        <!-- 2 Modal -->
        <div class="modal fade" id="exampleModalCenterTwo" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Второе модальное окно</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- МОД ОКНО -->
            <div class="modal-body">
                <form>
                  <div class="form-group">
                      <input type="text" class="form-control" id="inputname" placeholder="Имя" v-model="name">
                  </div>
                  <div class="form-group">
                      <input type="text" class="form-control" id="inputsurname" placeholder="Описание программы" v-model="about">
                  </div>  
                </form>
            </div>
            <div class="modal-footer">
                <button  type="button" class="btn btn-primary" v-on:click="updateInfo">Сохранить</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" >
      <div>
        <table class="table table-borderless">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">About</th>
            <th scope="col">Changes</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, index) in infs" v-bind="post" v-bind:index="index" v-bind:key="post._id">
                <td>{{++index}}</td>
                <td>{{post.name}}</td>
                <td>{{post.about}}</td>
                <td><button type="button" class="btn btn-danger" v-on:click="deletePost(post._id)">Delete</button></td>
                <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenterTwo" v-on:click="editPost(index,post._id)" >Изменить</button></td>
            </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import PostService from "../PostService";

export default {
  name: 'Information',
  data(){
    return {
      infs:[], // Целый объект ,который приходит от сервер
      name:'',
      about:'',
      indx:'',
      id:''
    }
  },
  async created(){
    try{
      this.infs = await PostService.getInfo()
    } catch(err) {
      this.error = err.message;
    }
  },
  methods:{
    async deletePost(id){
      await PostService.deleteInfo(id);
      this.infs = await PostService.getInfo()
    },
    async createPost(){
      await PostService.insertInfo(this.name,this.about);
      this.infs = await PostService.getInfo()
    },
    async editPost(index,id){
      this.name = this.infs[index - 1].name;
      this.about = this.infs[index - 1].about;
      this.indx = index;
      this.id = id
    },
    async updateInfo(id){
      let all = {
        name:this.name,
        about:this.about
      }
      await PostService.updateInfo(this.id,all);
      this.infs = await PostService.getInfo()
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
