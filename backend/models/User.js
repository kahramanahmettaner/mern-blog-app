const mongoose = require('mongoose')
require('mongoose-type-email')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: mongoose.SchemaTypes.Email,
        image: {
            type: String,
            required: true,
            default: ""
        },
        numberOfFollowers: {
            type: Number,
            default: 0
        },
        numberOfFollowedUsers: {
            type: Number,
            default: 0
        },
        numbberOfPosts: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true // MongoDB will give us both created at and updated at timestamps
    }
)

module.exports = mongoose.model('User', userSchema)