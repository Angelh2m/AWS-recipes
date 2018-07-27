module.exports.createTodo = (event, context, callback) => {

    const body = JSON.parse(event.body) // Contains the data sent to the API

    const mockDB = `${body.todo} is now saved to the DB`;

    const response = {
        status: 200,
        body: JSON.stringify({
            mockDB
        })
    }

    callback(null, response); //Call back sends the response
}