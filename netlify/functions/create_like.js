// Goal: Provide a function to create a new like in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_like?userId=xxxxxxxxxxxx&postId=yyyyyyyyyyyyyy
exports.handler = async function(event) {
  // get the two querystring parameters and store in memory
  let userId = event.queryStringParameters.userId
  let postId = event.queryStringParameters.postId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // query for an existing like, wait for it to return, store the query in memory
  let likesQuery = await db.collection('likes')
                           .where('postId', '==', postId)
                           .where('userId', '==', userId)
                           .get()

  // get the current number of likes for the post/user combination                           
  let numberOfLikes = likesQuery.size

  // if there isn't already a like for the post/user combination, create one
  if (numberOfLikes == 0) {
    await db.collection('likes').add({
      postId: postId,
      userId: userId
    })
  } 

  return {
    statusCode: 200
  }
}