const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User' // Reference to the User model
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post' // Reference to the Post model
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Like', likeSchema);
