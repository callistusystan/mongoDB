const mongoose = require('mongoose');
const { Schema  } = mongoose;
const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function() {
    // note that fat arrow function not used as the reference of 'this'
    // is the instance surrounding the statement, in this case, this document
    return this.posts.length;
});

// Using a pre middleware on the User remove event
UserSchema.pre('remove', function(next) {
    // instead of iterating (which is bad), use mongoose operator
    const BlogPost = mongoose.model('blogPost');

    BlogPost.remove({ _id: { $in: this.blogPosts } })
        .then(() => next());

    // call next() to inform that the remove operation is complete
});

// entire collection of data
const User = mongoose.model('user', UserSchema);

module.exports = User;