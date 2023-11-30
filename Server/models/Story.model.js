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
        maxLength: [700, "No puedes pasarte de 700 caracteres"]
    },

    cover: {
        type: String,
        default: "https://shorturl.at/kowxI"
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
    timestamps: true
}
)
const Story = model("Story", storySchema)

module.exports = Story