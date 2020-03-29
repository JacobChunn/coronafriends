var userData

// listen for auth status changes
auth.onAuthStateChanged(user => {
  console.log("user:",user)
  if (user) setupUI(user); else setupUI()
  userData = user
})


// create new post
document.getElementById("post-form").addEventListener('submit', (e) => {
  console.log("SUBMIT")
  e.preventDefault();

  // create posting in "postings" collection
  db.collection('postings').add({
    created_by: userData.email,
    text: document.getElementById("post-modal-description").value,
    type: document.querySelector("#post-form-typeselect").value,
    timestamp: Date.now()
  }).then(() => {
    // close the create modal & reset form
    document.getElementById("post-modal").style.display = "none"
    location.reload()
  }).catch(err => {
    console.log(err.message);
  });
});