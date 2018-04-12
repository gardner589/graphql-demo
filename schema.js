//**|Shout out to mpj(https://github.com/mpj) and Fun Fun Functions for the great videos!|**
// We're using Axios to make our API calls from the server
const axios = require("axios");
// Importing each part of the GraphQL
const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = require("graphql");

// We make a lot of get requests using Axios for our API routes, so I made this
// helper function to cut down on typing
const fetch = url => axios.get(url)

// Google translate API function - takes in the language to output (in 2 letter
// code, i.e. 'es' for Spanish) and a string that will be translated to that
// language
const translate = (lang, str) => {
    // 🤫🤫🤫🤫🤫🤫 pls don't steal
    const apiKey = 'AIzaSyAA92Rtc2tRjuX3CH_itoH1VbPWCHhdaRE'
    // build our api route using ES6 and the arguments we took in
    const url = `https://www.googleapis.com/language/translate/v2?key=${apiKey}&source=en&target=${lang}&q=${str}`
    // use our helper function and make the axios call to the api route, return the
    // translated text
    return fetch(url)
    // this is how the translate API returns our get request in JSON 👇
        .then(response => response.data.data.translations[0].translatedText)
}

// XKCD API function that lets us search for any comic by number
const xkcd = (num) => {
    // if we don't get passed a specific number, use one of my favorite XKCDs
    if (!num) {
        num = 162
    }
    const url = `https://xkcd.com/${num}/info.0.json`
    return fetch(url).then(response => response.data)
}

// News API function that lets us...search the news API
const news = (query, sortBy, from, to) => {
    // 🤫🤫🤫🤫🤫🤫 again, pls don't steal
    const apiKey = 'a4d4f3cdf45548a3a5d667c65738407d'
    // our "defaults" in case we don't pass any args through
    if (!query) {
        query = 'Uplifting'
    }
    if (!sortBy) {
        sortBy = 'popularity'
    }
    if (!from) {
        from = new Date()
    }
    if (!to) {
        to = new Date()
    }
    const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${apiKey}`
    return fetch(url).then(response => response.data.articles[0])
}

// Here is where the actual GraphQL package comes in, we're defining our schema by creating a custom GraphQL "Type"
// that we'll be able to use in our query down below
const NewsType = new GraphQLObjectType({
    name: 'NewsArticle',
    description: 'An article from the News API',
    // The fields in the object type map to the data that you're getting back from the API GET request.
    // They would also map to our SQL/NoSQL schemas if we were using our own API. 🆒🆒🆒
    fields: () => ({
        source: {
            // Notice we specify what type we expect the data to be in for each field
            type: GraphQLString,
            // Here is some GraphQL magic. We have the option to create a "resolve" function for
            // each field, that can be used to manipulate the data we receive in whatever ways necessary
            // this is another reason why GraphQL is so precise and only returns exactly what you need
            // because the response was a JSON object, the data was nested at various levels
            // we account for that here!
            resolve: response => response.source.name
        },
        author: {
            type: GraphQLString,
            // This resolve is error handling in case our API results are null for whatever reason
            resolve: response => response.author !== null
                ? response.author
                : 'No author found'
        },
        title: {
            type: GraphQLString,
            args: {
                lang: {
                    type: GraphQLString
                }
            },
            // Another awesome thing about resolves: here we call our google translate function
            // to translate the results we get back from the API! 😲
            resolve: (response, args) => {
                const title = response.title
                return args.lang
                    ? translate(args.lang, title)
                    : title
            }
        },
        summary: {
            type: GraphQLString,
            args: {
                lang: {
                    type: GraphQLString
                }
            },
            resolve: (response, args) => {
                const summary = response.description
                return args.lang
                    ? translate(args.lang, summary)
                    : summary
            }
        },
        url: {
            type: GraphQLString
        },
        published: {
            type: GraphQLString,
            resolve: response => response.publishedAt
        }
    })
})

// creating our XKCD object type
const XkcdType = new GraphQLObjectType({
    name: 'XKCD',
    description: 'A comic from XKCD',
    fields: () => ({
        num: {
            type: GraphQLInt
        },
        link: {
            type: GraphQLString
        },
        year: {
            type: GraphQLString
        },
        transcript: {
            type: GraphQLString,
            args: {
                lang: {
                    type: GraphQLString
                }
            },
            resolve: (response, args) => {
                const transcript = response.transcript
                return args.lang
                    ? translate(args.lang, transcript)
                    : transcript
            }
        },
        img: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString,
            args: {
                lang: {
                    type: GraphQLString
                }
            },
            resolve: (response, args) => {
                const title = response.title
                return args.lang
                    ? translate(args.lang, title)
                    : title
            }
        },
        alt: {
            type: GraphQLString,
            args: {
                lang: {
                    type: GraphQLString
                }
            },
            resolve: (response, args) => {
                const alt = response.alt
                return args.lang
                    ? translate(args.lang, alt)
                    : alt
            }
        }
    })
})

// Here's where we construct the top layer of our schema and our query object
const schema = new GraphQLSchema({
    // As you can see, our query object uses the same syntax as the type objects above
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'Used to seach through our various APIs',
        // for our query object, the fields consist of the type objects we made earlier!
        // this is why GraphQL is so precise with the information that's returned
        fields: () => ({
            xkcd: {
                type: XkcdType,
                args: {
                    num: {
                        type: GraphQLInt
                    }
                },
                // in our resolve for the query, we match the args taken in by the API call functions we created
                resolve: (root, args) => xkcd(args.num)
            },
            // we can specify different args, multiple types, and get as specific as we want/need to
            news: {
                type: NewsType,
                args: {
                    query: {
                        type: GraphQLString
                    },
                    sortBy:{
                        type: GraphQLString
                    },
                    from:{
                        type: GraphQLString
                    },
                    to:{
                        type: GraphQLString
                    }
                },
                resolve: (root, args) => news(args.query, args.sortBy, args.from, args.to)
            }
        })
    })
})

module.exports = schema;