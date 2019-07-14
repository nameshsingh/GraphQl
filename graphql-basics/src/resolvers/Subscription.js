const Subscription = {
    
    comment: {
        subscribe(parent, {postId}, { pubsub, db },info ) {
            const post = db.posts.find((post) => postId === post.id && post.published);

            if(!post) {
                throw new Error('Post not found');
            }

            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },
    post: {
        subscribe(parent, args, { pubsub, db},info) {
            return pubsub.asyncIterator('post');
        }
    }
    // user: {
    //     subscribe(parent, { userId }, { pub})
    // }
}

export { Subscription as default }