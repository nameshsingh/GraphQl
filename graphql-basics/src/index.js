import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
//Type Definition (schema)
    // Application schema - defines all the operation that can be performed and what our data looks like

// Demo Data

const users = [
    {
        id: "223",
        email: "johndoe@dsadf.com",
        name: "John Doe",
        age: 28,
        comments
    },
    {
        id: "123",
        email: "sarah@adfa.com",
        name: "Sarah Conor",
        age: 26
    }
]
const posts = [{
    id: '1221',
    title: 'Graphql 101',
    body: "Graphql basics",
    published: true,
    author: "223"
}, {
    id: "1231",
    title: "Hello World",
    body: "Hello earth",
    published: false,
    author: "123"
}]

const comments = [{
    id: '12341231324',
    text: 'COmment',
    author: '123',
    post: '1231'
}, {
    id: '13h1jkefhjkf',
    text: 'asdfljalksd',
    author: '123',
    post: '1221'


},
{
    id: '123412asdfa',
    text: 'COmmentasdfas',
    author: '123',
    post: '1231'


}, {
    id: '13h1jasdfa',
    text: 'Hello world',
    author: '123',
    post: '1221'

},
]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int!): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!,
        author: User!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;


//Resolvers

const resolvers = {
    Query: {
        me() {
            return {
                id: '2134lkas',
                name: 'Namesh Singh',
                email: 'nameshsingh@gmail.com',
                age: 25
            }
        },
        post() {
            return {
                id: '1231fsafc',
                title: 'random post',
                body: 'jfaldjsfklads',
                published: true,
                author: '2134lkas'
            }
        },
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        posts(parent, args,ctx, info) {
            if(!args.query) {
                return posts;
            }
            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        comments(parent, args, ctx, info) {
            return comments;
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => {
                return user.email === args.email
            });

            if(emailTaken) {
                throw new Error('Email Taken');
            }
            

            const user = {
                id: uuidv4(),
                ...args
            }

            users.push(user);

            return user;
        },
        createPost(parent, args, ctx, info) {
            const userExist = users.some((user) => user.id === args.author);
            if(!userExist) {
                throw new Error('User not found');
            }

            const newPost = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }

            posts.push(newPost);

            return newPost;
        },
        createComment(parent, args, ctx, info) {
            const userExist = users.some((user) => user.id === args.author);
            const postExist = posts.some((post) => post.id === args.post && post.published == true);
            
            if(!userExist || !postExist) {
                throw new Error('Unable to find user or post');
            }
            
            const newPost = {
                id: uuidv4(),
                text: args.text,
                author: args.author,
                post: args.post
            }

            posts.push(newPost);

            return newPost;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id;
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id;
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id;
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author;
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post;
            })
        }
    },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server is running')
})