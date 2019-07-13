import uuidv4 from "uuid/v4";

const Mutation = {
    createUser(parent, args, {db}, info) {
      const emailTaken = db.users.some(user => {
        return user.email === args.data.email;
      });

      if (emailTaken) {
        throw new Error("Email Taken");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      db.users.push(user);

      return user;
    },
    deleteUser(parent, args, {db}, info) {
      const userIndex = db.users.findIndex(user => user.id === args.id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      const deletedUser = db.users.splice(userIndex, 1);

      db.posts = db.posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
            db.comments = db.comments.filter(comment => {
            return comment.post !== post.id;
          });
        }

        return !match;
      });

      db.comments = db.comments.filter(comment => comment.author !== args.id);

      return deletedUser[0];
    },
    updateUser(parent, {id, data}, { db }, info) {
      const user = db.users.find(user => user.id === id);
      if (!user) {
        throw new Error("User not found");
      } 
      if(typeof data.email === 'string') {
          const emailTaken = db.users.some((user) => user.email === data.email)

          if(emailTaken) {
              throw new Error('Email Taken') 
          }

          user.email = data.email;
      }
      if(typeof data.name === 'string') {
          user.name = data.name;
      }

      if(typeof data.age !== undefined) {
          user.age = data.age;
      }
      return user;
    },
    createPost(parent, args, {db}, info) {
      const userExist = db.users.some(user => user.id === args.data.author);
      if (!userExist) {
        throw new Error("User not found");
      }

      const newPost = {
        id: uuidv4(),
        ...args.data
      };

      db.posts.push(newPost);

      return newPost;
    },
    deletePost(parent, args, {db}, info) {
      const postIndex = db.posts.findIndex(post => post.id === args.id);

      if (postIndex === -1) {
        throw new Error("Post not Found.");
      }

      const deletedPost = db.posts.splice(postIndex, 1);

      db.comments = db.comments.filter(comment => {
        return comment.post !== args.id;
      });

      return deletedPost[0];
    },
    updatePost(parent, {id, data}, {db}, info) {
        const post = db.posts.find((post) => post.id === id)
        if(!post) {
            throw new Error('Post not found')
        }
        if(typeof data.title === 'string') {
            post.title = data.title
        }
        if(typeof data.body === 'string') {
            post.body = data.body
        }
        if(typeof data.published === 'boolean') {
            post.published = data.published
        }
        return post;
    },
    createComment(parent, args, {db}, info) {
      const userExist = db.users.some(user => user.id === args.data.author);
      const postExist = db.posts.some(
        post => post.id === args.data.post && post.published == true
      );

      if (!userExist || !postExist) {
        throw new Error("Unable to find user or post");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      db.comments.push(comment);

      return comment;
    },
    updateComment(parent, {id, data}, {db}, info) {
        const comment = db.comments.find((comment) => comment.id === id)
        if(!comment) {
            throw new Error('Comment not found')
        }
        if(typeof data.text === 'string') {
            comment.text = data.text
        }
        return comment;
    },

    deleteComment(parent, args, {db}, info) {
      const commentIndex = db.comments.findIndex(
        comment => comment.id === args.id
      );

      if (commentIndex === -1) {
        throw new Error("Comment not Found");
      }

      const deletedComment = db.comments.splice(commentIndex, 1);

      return deletedComment[0];
    }
  }

  export { Mutation as default }