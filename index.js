
/*   

    - query params => meusite.com/users?name=maicon&age=42 // FILTROS
    - route params => /users/2  //BUSCAR, DELETAR E ATUALIZAR ALGO ESPECÍFICO
    - request body => {"name": "maicon", "age": "42"}

    - GET           => buscar informaçõ no back end
    - POST          => criar informação no back end
    - PUT / PATCH   => alterar/visualizar informação no back end
    - DELETE        => deletar informação no back end

    - Middleware    => INTERCEPTADOR => Tem poder de parara dados da requisição
    
    */
const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())




/*const myFilrstMiddleware = (request, response, next) => {

    console.log('fui chamado')

    next()

    console.log('finalizamos')
}

app.use(myFilrstMiddleware)*/

const users = []

const checkUserId = (request, response, next) => {

    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "user not found" })
    }

    request.userIndex = index
    request.userId = id



    next()

}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId , (request, response) => {

    const { name, age } = request.body

    const index = request.userIndex

    const id = request.userId

    const updatedUsers = { id, name, age }

    users[index] = updatedUsers

    return response.json(updatedUsers)
})

app.delete('/users/:id', checkUserId , (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(3000, () => {
    console.log(`🚀Server started on port ${port}`)
})