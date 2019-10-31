const express = require("express");
const mongodb = require("mongodb");
const config = require("../config/config");

const router = express.Router();



router.get("/", async (req,res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

router.get("/info", async (req,res)=>{
    const inf = await getInfo();
    res.send(await inf.find({}).toArray());
})

//Add image
router.post('/',async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text : req.body.text,
        about:req.body.about
    });
    res.status(201).send();
});

//Add information about "image"
router.post('/info',async (req,res) => {
    const inf = await getInfo();
    await inf.insertOne({
        name : req.body.name,
        about:req.body.about
    });
    res.status(201).send();
});

//Delete Post 
router.delete('/:id',async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

//Delete information
router.delete('/info/:id',async (req,res) => {
    const inf = await getInfo();
    await inf.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


//Update info
router.put('/info/:id',async (req,res) => {
    const inf = await getInfo();
    await inf.replaceOne({_id: new mongodb.ObjectID(req.params.id)},req.body).then(function(){c
        res.status(200).send();
    })
})


// connect db
async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect(
        config.dbLink,{
        useUnifiedTopology: true,
        useNewUrlParser: true
        });
        return client.db(config.dbName).collection(config.dbCollection);
}

async function getInfo(){
    const client = await mongodb.MongoClient.connect(
        config.dbLink,{
        useUnifiedTopology: true,
        useNewUrlParser: true
        });
        return client.db(config.dbName).collection(config.dbCollectionTwo);
}


module.exports = router;