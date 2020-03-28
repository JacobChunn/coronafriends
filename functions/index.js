const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()



exports.getPosts = functions.https.onCall((data, context) => {
    const db = admin.firestore()

    // get all posts
    return db.collection('postings').get()
        .then(docs => {
            console.log(docs)

            let displayDocs = []

            docs.forEach(doc => {
                console.log(doc, doc.type, data.type)
                if (doc.type === data.type) displayDocs.push(doc)
            })

            // docs.forEach(doc => {
            //     if (doc.timestamp > 1585432367241) display.push(doc)
            // });

            return { displayDocs }
        })
        .catch(err => console.log(err))
})
