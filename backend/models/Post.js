const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 100
        },
        text: {
            type: String,
            required: true,
            maxLength: 5000
        },
        viewsCountRegistered: {
            type: Number,
            default: 0
        },
        viewsCountGuest: {
            type: Number,
            default: 0
        },
        commentsCount: {
            type: Number,
            default: 0
        },
        likesCount: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String],
            default: [],
            validator: function (value) {
                // Validate minimum and maximum length for each tag
                const minLength = 2; // Minimum length, assuming at least one letter (excluding #)
                const maxLength = 30; // Maximum length (adjust as needed)

                // Ensure each tag starts with '#' and meets length criteria
                return value.every(tag =>
                    /^#[a-zA-Z0-9]+$/.test(tag) && tag.length >= minLength && tag.length <= maxLength
                );
            },
            message: 'Invalid tag format or length'
        },
    },
    {
        timestamps: true // MongoDB will give us both created at and updated at timestamps
    }
)

module.exports = mongoose.model('Post', postSchema)