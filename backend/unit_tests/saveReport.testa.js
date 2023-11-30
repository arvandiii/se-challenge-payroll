const { mongoose } = require('../src/models/mongo');

test('test mongoose connection', async () => {
    console.log(mongoose.connection.readyState);

    expect(1 + 2).toBe(3);
});