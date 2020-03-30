const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()



exports.getPosts = functions.https.onCall((data, context) => {
    const db = admin.firestore()

    // get all posts
    return db.collection('postings').get()
        .then(docs => {

            let clientSelectedType = data.type

            // this is the array that we send back to the client to be displayed
            let displayDocs = []

            docs.forEach(doc => {
                let dbDocType = doc._fieldsProto.type.stringValue

                // check that this doc's type and the client selected are the same
                if (dbDocType === clientSelectedType) displayDocs.push(doc._fieldsProto)
            })

            return displayDocs
        })
        .catch(err => console.log(err))
})
