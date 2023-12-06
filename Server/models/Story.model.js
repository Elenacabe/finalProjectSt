
const { Schema, model } = require("mongoose")
const storySchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
    valoration:
        [{
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            vote: { type: Number, enum: [0, 1, 2, 3, 4, 5] }
        }]
    ,

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