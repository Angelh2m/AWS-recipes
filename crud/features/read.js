'use strict';

module.exports.getTodo = (event, context, callback) => {

    const todo = "Make Dinner";
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            todo,
        }),
    };

    callback(null, response);
};