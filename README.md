# graphql-demo
## Node.js, Express, & GraphQL
---
This app demonstrates the capabilities of GraphQL by integrating 3 different APIs (Google Translate, XKCD, & News API) into a GraphQL Schema and allowing queries to each API (and sometimes combining them!).

The app uses the very helpful GraphiQL interface, which gives us a GUI where we can run our queries.
![the helpful graphiql interface](http://graphql.org/img/hello.png)

The express graphql server [guide](http://graphql.org/graphql-js/running-an-express-graphql-server/) walks you through setting up a server and provides a lot of great information on the GraphQL basics.

## Queries
```GraphQL
{
  # here we're querying the XKCD API and searching by number/id
english: xkcd (num: 666)
  {
  num
  link
  year
  img
  title
  alt
  transcript
  }
  
  # We've also hooked into the Google Translate API so we can translate our results
  # after we get them. Think of all the cool (and useful)API interactions!
 spanish: xkcd (num: 666)
  {
  title (lang: "es")
  alt (lang: "es")
  transcript (lang: "es")
  }

  # We can decide exactly how much and what data we want to get back
  justText: xkcd (num: 666) {
  transcript
  title
  alt
  }
  
  # We also have some error handling that lets us get results if we don't provide any args
  noArgs: xkcd {
  num
  link
  year
  img
  title
  alt
  transcript
  }
  
  # The "new" in front of xkcd is called a 'field alias' and it allows us to run
  # as many of the same queries as we'd like
  new: xkcd (num: 1200) {
  num
  link
  year
  img
  title
  alt
  transcript
  }
  
  # Combining our queries all sorts of ways, different comic, only text, and in French!
  newFrench: xkcd (num: 1522) {
  num
  link
  title (lang: "fr")
  alt (lang: "fr")
  transcript (lang: "fr")
  }

  # Default query for our news object is set to "Uplifting" by our function
  news
  {
  source
  title
  author
  summary
  url
  published
}
  # We can use as many field aliases as we need to 
  nasa: news (query: "NASA")
  {
  source
  title
  author
  summary
  url
  published
}
  dogs: news(query: "dogs")
  {
  source
  title
  author
  summary
  url
  published
  }
  # And mix & match our API calls even between GraphQL Objects
  germanDogs: news(query: "dogs")
  {
  source
  title (lang: "de")
  author
  summary
  url
  published
  }
}
# All of these queries are using pre-built APIs that we have access to with GET requests,
# but it would be even MORE useful if you set up your own database and API with 
# GraphQL in mind

```
### Results
```GraphQL
{
  "data": {
    "english": {
      "num": 666,
      "link": "",
      "year": "2009",
      "img": "https://imgs.xkcd.com/comics/silent_hammer.png",
      "title": "Silent Hammer",
      "alt": "I bet he'll keep quiet for a couple weeks and then-- wait, did you nail a piece of scrap wood to my antique table a moment ago?",
      "transcript": "[[Hat guy is hammering something on a table.]]\nGuy: What--\nHat Guy: Silent hammer. I've made a set of silent tools.\nGuy: Why?\nHammer: <<whoosh whoosh whoosh>>\n\nHat Guy: Stealth carpentry. Breaking into a house at night and moving windows, adjusting walls, etc.\n[[He takes his silent hammer over to a tool bench with other things on it. Two boxes underneath are labeled \"Drills\" and \"Non-Drills.\"]]\n\nHat Guy, narrating: After a week or so of questioning his own sanity, the owner will stay up to watch the house at night. I'll make scratching noises in the walls, pipe in knockout gas, move him up to his bed, and never bother him again.\n[[The events he's describing are shown in two mini-panels below.]]\n\nGuy, off-panel: Nice prank, I guess, but what's the point?\nHat Guy: Check out the owner's card, on the table.\nGuy, off-panel: Chair of the American Skeptics Society? Oh, god.\nHat guy: Yeah, this doesn't end well for him.\n\n{{Title text: I bet he'll keep quiet for a couple weeks and then-- wait, did you nail a piece of scrap wood to my antique table a moment ago?}}"
    },
    "spanish": {
      "title": "Martillo silencioso",
      "alt": "Apuesto a que se mantendrá en silencio por un par de semanas y luego ... espera, ¿has clavado un trozo de madera en mi mesa antigua hace un momento?",
      "transcript": "[[Tipo de sombrero está martillando algo en una mesa.]] Guy: Qué-- Sombrero: Martillo silencioso. He hecho un conjunto de herramientas silenciosas. Guy: ¿Por qué? Martillo: &lt; <whoosh whoosh whoosh> &gt; Sombrero: carpintería sigilosa. Irrumpir en una casa por la noche y mover ventanas, ajustar paredes, etc. [[Él lleva su martillo silencioso a un banco de herramientas con otras cosas sobre él. Dos cajas debajo están rotuladas como &quot;Taladros&quot; y &quot;Sin taladros&quot;.]] Sombrero Chico, narrando: Después de una semana o más de cuestionar su propia cordura, el propietario se quedará despierto para vigilar la casa por la noche. Haré ruidos de arañazos en las paredes, piparé con gas, lo moveré hasta su cama y nunca más lo molestaré. [[Los eventos que está describiendo se muestran en dos minipaneles a continuación.]] Guy, fuera del panel: Buena broma, supongo, pero ¿cuál es el punto? Tipo de sombrero: Echa un vistazo a la tarjeta del propietario, sobre la mesa. Guy, fuera del panel: ¿Presidente de la American Skeptics Society? Oh Dios. Sombrero: Sí, esto no termina bien para él. {{Texto del título: apuesto a que se mantendrá en silencio durante un par de semanas y luego-- espera, ¿has clavado un trozo de madera en mi mesa antigua hace un momento?}}"
    },
    "justText": {
      "transcript": "[[Hat guy is hammering something on a table.]]\nGuy: What--\nHat Guy: Silent hammer. I've made a set of silent tools.\nGuy: Why?\nHammer: <<whoosh whoosh whoosh>>\n\nHat Guy: Stealth carpentry. Breaking into a house at night and moving windows, adjusting walls, etc.\n[[He takes his silent hammer over to a tool bench with other things on it. Two boxes underneath are labeled \"Drills\" and \"Non-Drills.\"]]\n\nHat Guy, narrating: After a week or so of questioning his own sanity, the owner will stay up to watch the house at night. I'll make scratching noises in the walls, pipe in knockout gas, move him up to his bed, and never bother him again.\n[[The events he's describing are shown in two mini-panels below.]]\n\nGuy, off-panel: Nice prank, I guess, but what's the point?\nHat Guy: Check out the owner's card, on the table.\nGuy, off-panel: Chair of the American Skeptics Society? Oh, god.\nHat guy: Yeah, this doesn't end well for him.\n\n{{Title text: I bet he'll keep quiet for a couple weeks and then-- wait, did you nail a piece of scrap wood to my antique table a moment ago?}}",
      "title": "Silent Hammer",
      "alt": "I bet he'll keep quiet for a couple weeks and then-- wait, did you nail a piece of scrap wood to my antique table a moment ago?"
    },
    "noArgs": {
      "num": 162,
      "link": "",
      "year": "2006",
      "img": "https://imgs.xkcd.com/comics/angular_momentum.jpg",
      "title": "Angular Momentum",
      "alt": "With reasonable assumptions about latitude and body shape, how much time might she gain them?  Note: whatever the answer, sunrise always comes too soon. (Also, is it worth it if she throws up?)",
      "transcript": "[[Man sits on his bed, looking at a girl who is spinning.  It is night.]]\nMan on bed: What are you doing? \nGirl: Spinning counterclockwise\nEach turn robs the planet of angular momentum\nSlowing its spin by the tiniest bit\nLengthening the night, pushing back the dawn\nGiving me a little more time here\nWith you\n{{title text: With reasonable assumptions about latitude and body shape, how much time might she gain them?  Note: whatever the answer, sunrise always comes too soon. (Also, is it worth it if she throws up?)}}"
    },
    "new": {
      "num": 1200,
      "link": "",
      "year": "2013",
      "img": "https://imgs.xkcd.com/comics/authorization.png",
      "title": "Authorization",
      "alt": "Before you say anything, no, I know not to leave my computer sitting out logged in to all my accounts. I have it set up so after a few minutes of inactivity it automatically switches to my brother's.",
      "transcript": "[[A web chart. In the center is a bubble labeled 'user account on my laptop', connecting from which are the bubbles 'Dropbox', 'photos & files', 'Facebook', 'Gmail', 'Paypal', and 'bank'. These bubbles are also all connected to each other. A seventh bubble is attached to the center bubble, labeled 'admin account'. It is covered in a thick border, spikes, and has a lock between it and the central bubble.]]\nIf someone steals my laptop while I'm logged in, they can read my email, take my money, and impersonate me to my friends, but at least they can't install drivers without my permission.\n\n{{Title text: Before you say anything, no, I know not to leave my computer sitting out logged in to all my accounts. I have it set up so after a few minutes of inactivity it automatically switches to my brother's.}}"
    },
    "newFrench": {
      "num": 1522,
      "link": "",
      "title": "Astronomie",
      "alt": "L&#39;astrobiologie est freinée par le fait que nous sommes tous trop nerveux pour tenter d&#39;équilibrer l&#39;échelle tout en tenant un microscope coûteux.",
      "transcript": "[[Une figure regarde à travers un grand télescope pointé vers les cieux. Une toile de milliers d&#39;étoiles remplit le ciel.]] [[Une figure dans un béret se lève avec une échelle et une loupe. L&#39;astronome continue à regarder dans l&#39;optique, toujours alerte.]] [[La figure s&#39;installe et stabilise l&#39;échelle alors que l&#39;astronome continue à observer à travers la lunette.]] [[Le béret grimpe l&#39;échelle, regarde les étoiles à travers le loupe. L&#39;astronome reste complètement impassible.]] {{Titre: L&#39;astrobiologie est freinée par le fait que nous sommes tous trop nerveux pour tenter d&#39;équilibrer l&#39;échelle tout en tenant un microscope coûteux.}}"
    },
    "news": {
      "source": "Lifehacker.com",
      "title": "What's Your Favorite Subreddit?",
      "author": "Nick Douglas",
      "summary": "Away from the Trump supporter spam and creepy fake celebrity porn, Reddit is still home to uplifting conversations, useful information, and weird-ass videos. The key is, and always has been, subscribing to the right subreddits. The Lifehacker team shares our …",
      "url": "https://lifehacker.com/whats-your-favorite-subreddit-1823323002",
      "published": "2018-02-26T16:30:00Z"
    },
    "nasa": {
      "source": "Lifehacker.com",
      "title": "How to See the Super Blue Blood Moon Next Week",
      "author": "Aimée Lutkin",
      "summary": "The heavens are really pulling out all the stops in 2018. On Wednesday, there is an opportunity to see a pretty amazing moon trifecta: super, blue, and blood. Read more...",
      "url": "https://lifehacker.com/how-to-see-the-super-blue-blood-moon-next-week-1822457914",
      "published": "2018-01-26T19:20:00Z"
    },
    "dogs": {
      "source": "Lifehacker.com",
      "title": "I Despise Dogs But My Fiancée Loves Them",
      "author": "Patrick Allan",
      "summary": "You’ve got problems, I’ve got advice. This advice isn’t sugar-coated—in fact, it’s sugar-free, and may even be a little bitter. Welcome to Tough Love. Read more...",
      "url": "https://lifehacker.com/i-despise-dogs-but-my-fiancee-loves-them-1822125348",
      "published": "2018-01-16T22:00:00Z"
    },
    "germanDogs": {
      "source": "Lifehacker.com",
      "title": "Ich verachte Hunde, aber mein Verlobter liebt sie",
      "author": "Patrick Allan",
      "summary": "You’ve got problems, I’ve got advice. This advice isn’t sugar-coated—in fact, it’s sugar-free, and may even be a little bitter. Welcome to Tough Love. Read more...",
      "url": "https://lifehacker.com/i-despise-dogs-but-my-fiancee-loves-them-1822125348",
      "published": "2018-01-16T22:00:00Z"
    }
  }
}
```

Speaking of using your own API...A big feature I wasn't able to incorporate is [Mutations](http://graphql.org/learn/queries/#mutations). Mutations are what let you write/modify data on your server, think of them as GraphQL's version of a "POST". They're also reminiscent of ES6 Classes or Constructors, here's an example from the documentation:
``` GraphQL
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}

{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```
You can see how this helps organize the data in your database and allows for the easy creation of new entries into a SQL/NoSQL database.

GraphQL improves upon REST by allowing us to limit the amount of queries we make for data (from a database or an external API) and ensuring we receive exactly the data we're looking for, no more, no less.

Happy GraphQLing!

![GraphQL Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/512px-GraphQL_Logo.svg.png)
