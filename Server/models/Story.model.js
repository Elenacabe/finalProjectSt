const { Schema, model } = require("mongoose")
const storySchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    title: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true,
        minLength: [120, "It's a short story, not a word"],
        maxLength: [700, "It's not a novel"]
    },

    cover: {
        type: String,
        default: "https://forreadingaddicts.co.uk/wp-content/uploads/2016/09/cat-reading.jpg"
    },
    valoration: {
        type: Number,
        default: 0
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, {
    timeStamps: true
}
)
const Story = model("story", storySchema)

module.exports = Story