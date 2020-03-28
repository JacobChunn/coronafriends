// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

// Cloud Functions
const getPosts = functions.httpsCallable('getPosts')

const setupUI = (user) => {
  if (user) {
    document.getElementById('profpic').src = user.photoURL
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }


  // db.collection('postings').get().then(docs => {
  // getPosts({type='chat'}).then((docs) => {
  //   var html = ''
  //   docs.forEach(doc => {
  //     data = doc.data()
  //     html += `
  //       <div class="posting">
  //         <p class="postingtype"> ${data.type} </p>
  //         <p class="postingtext"> ${data.text} </p>
  //         <a class="postingaccept">Go</a>
  //       </div>
  //     `
  //   })

    // document.getElementById("postings-container").innerHTML = html
  // });
};

document.getElementById("login-a").addEventListener("click", () => {
  document.getElementById("signin-modal").style.display = "block";
})


document.getElementById("post-modal-a").addEventListener("click", () => {
  document.getElementById('post-modal').style.display = "block";
})

document.getElementById("logout-a").addEventListener("click", () => {
  signOutAndReload()
})

closemodals = document.getElementsByClassName("closemodal")
Array.from(closemodals).forEach(button => {
  button.addEventListener("click", () => {button.parentElement.style.display="none"})
})

const signOutAndReload = () => {
  auth.signOut()
  location.reload()
}
