const Query = {
    me() {
      return {
        id: "2134lkas",
        name: "Namesh Singh",
        email: "nameshsingh@gmail.com",
        age: 25
      };
    },
    post() {
      return {
        id: "1231fsafc",
        title: "random post",
        body: "jfaldjsfklads",
        published: true,
        author: "2134lkas"
      };
    },
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }
      return db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      }
      return db.posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments;
    }
  }

  export { Query as default}