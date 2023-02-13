const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`server up and running at port ${port}`);
})

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost/moviesDatabase";

app.post('/movies/create', async(req, res) => {
  const movie = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('movieDatabase').collection('movie').insertOne({
    Title: movie.Title,
    Synopsis: movie.Synopsis,
    Action: movie.Action,
    War: movie.War,
    Adventure: movie.Adventure,
    Comedy: movie.Comedy,
    Drama: movie.Drama,
    Romance: movie.Romance,
    SciFi: movie.SciFi,
    Fantasy: movie.Fantasy,
    Horror: movie.Horror,
    Mystery: movie.Mystery,
    Crime: movie.Crime,
    Animation: movie.Animation,
    Documentary: movie.Documentary,
    Rate: movie.Rate
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "Movie with ID = "+movie.id+" is created",
    "movie": movie
  });
})

app.get('/movies', async(req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const users = await client.db('movieDatabase').collection('movie').find({}).toArray();
    await client.close();
    res.status(200).send(users);
  })

app.get('/movies/:title', async(req, res) => {
  const title = req.params.title;
  const client = new MongoClient(uri);
  await client.connect();
  const movie = await client.db('movieDatabase').collection('movie').findOne({"Title": title});
  await client.close();
  if (movie == null) {
      res.status(200).send({
          "status": "Not Fround",
        }); 
  }
  else {
      res.status(200).send({
          "status": "ok",
          "movie": movie
        });
  }
})

app.post('/movies/point/:act/:war/:adv/:com/:dra/:rom/:sci/:fan/:hor/:mys/:cri/:ani/:doc', async(req, res) => {
  const Action = parseFloat(req.params["act"]); const Fantasy = parseFloat(req.params["fan"]);
  const War = parseFloat(req.params["war"]); const Horror = parseFloat(req.params["hor"]);
  const Adventure = parseFloat(req.params["adv"]); const Mystery = parseFloat(req.params["mys"]);
  const Comedy = parseFloat(req.params["com"]); const Crime = parseFloat(req.params["cri"]);
  const Drama = parseFloat(req.params["dra"]); const Animation = parseFloat(req.params["ani"]);
  const Romance = parseFloat(req.params["rom"]); const Docu = parseFloat(req.params["doc"]);
  const SciFi = parseFloat(req.params["sci"]);
  
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('movieDatabase').collection('userPoint').insertOne({
    Action: Action,
    War: War,
    Adventure: Adventure,
    Comedy: Comedy,
    Drama: Drama,
    Romance: Romance,
    SciFi: SciFi,
    Fantasy: Fantasy,
    Horror: Horror,
    Mystery: Mystery,
    Crime: Crime,
    Animation: Animation,
    Documentary: Docu
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "Point is created",
  });
})

app.get('/points', async(req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  const points = await client.db('movieDatabase').collection('userPoint').find({}).toArray();
  await client.close();
  res.status(200).send(points);
})