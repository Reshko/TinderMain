import axios from "axios";


const url = "http://localhost:5000/game/"

const url2 = "http://localhost:5000/game/info/"

class PostService{
    //Get Posts
    static getPosts(){
        return new Promise(async (resolve,reject) =>{
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post =>({
                        ...post
                    }))
                )
            } catch(err){
                reject(err)
            }
        });
    }

    static getInfo(){
        return new Promise(async (resolve,reject) =>{
            try{
                const res = await axios.get(url2);
                const data = res.data;
                resolve(
                    data.map(post =>({
                        ...post
                    }))
                )
            } catch(err){
                reject(err)
            }
        });
        
    }

    //Create Post
    static insertPost(text){
        return axios.post(url,{
            text
        });
    }

    //Create Info
    static insertInfo(name,about){
        return axios.post(url2,{
            name,about
        });
    }

    //put

    static updateInfo(id,all){
        return axios.put(`${url2}${id}`,all);
    }

    //Delete
    static deletePost(id){
        return axios.delete(`${url}${id}`)
    }

    //Delete info
    static deleteInfo(id){
        return axios.delete(`${url2}${id}`)
    }
}

export default PostService;