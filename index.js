const express = require('express')
const app = express()

class Beer{
    constructor(id, name, brewery){
        this.id = id
        this.name = name
        this.brewery = brewery
    }
}

const beers = [
    new Beer(1, "øl1", "Mikkeller"),
    new Beer(2, "øl2", "To Øl"),
    new Beer(3, "øl3", "Carlsberg"),
    new Beer(4, "øl4", "Heineken"),
    new Beer(5, "øl5", "Skovlyst"),
    new Beer(6, "øl6", "Guiness"),
    new Beer(7, "øl7", "Tuborg"),
    new Beer(8, "øl8", "Nørrebro Bryghus"),
    new Beer(9, "øl9", "Brew Dog"),
]


app.use(express.json())

app.get('/', (req, res) => {
    res.send({message:'test message'})
})

app.get('/welcome', (req, res) => {
    res.send({message:'Welcome'})
})

app.get('/beers', (req, res) => {
    res.send(beers)
})

app.get('/beers/:id', (req, res) => {
    res.send(beers[req.params.id - 1])
})

app.post("/beers", (req, res) => {
    const highestId = beers.reduce((a, b) => (a.id < b.id)? b : a).id
    console.log("highestId: ", highestId)

    const {name, brewery} = req.body
    console.log("name: ", name, "brewery: ", brewery)

    const newBeer = new Beer(highestId+1, name, brewery)
    beers.push(newBeer)

    res.send(newBeer)
})

app.put("/beers/:id", (req, res) => {
    const updatedbeer = {
        "id": parseFloat(req.params.id),
        "name": req.body.name,
        "brewery": req.body.brewery
    }
    beers[req.params.id - 1] = updatedbeer

    res.send(updatedbeer)
})


app.patch("/beers/:id", (req, res) => {
    for(const property in req.body){
        beers[req.params.id - 1][property] = req.body[property]
    }
    console.log("id: ", req.params.id)
    
    res.send(beers[req.params.id - 1])
})


app.delete("/beers/:id", (req, res) => {
    const id = beers.findIndex((a) => a.id == req.params.id)
    beers.splice(id, 1)

    //maybe?
    res.send(200)
})


app.listen(3000, () => {
    console.log("Server started")
})