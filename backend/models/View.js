const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema(
    {
        isRegisteredUser: {
            type: Boolean,
            required: true,
            default: false // Default to false; update based on your application logic
        },
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

module.exports = mongoose.model('View', viewSchema);
