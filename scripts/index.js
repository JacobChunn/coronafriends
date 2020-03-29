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

  if (user) {
    let selectedType = getParameterByName('type');
    getPosts({ type: selectedType })
      .then(docs => docs.data.displayDocs)
      .then(docs => {

        let html = ''
        docs.forEach(doc => {
          html += `
              <div class="posting">
                <p class="postingtype"> ${doc.type.stringValue} </p>
                <p class="postingtext"> ${doc.text.stringValue} </p>
                <a class="postingaccept">Go</a>
              </div>
            `
        })

        // put the posts we created in the HTML container
        document.getElementById("postings-container").innerHTML = html
      })
      .catch(err => console.log(err))
  }
}

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
  button.addEventListener("click", () => { button.parentElement.style.display = "none" })
})

categorySelectButtons = document.getElementsByClassName("category-button")
Array.from(categorySelectButtons).forEach(button => {
  button.addEventListener("click", () => {
    // location.href = `?type=${button.innerHTML}`

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?type=${button.innerHTML}`;
    window.history.pushState({ path: newurl }, '', newurl);

    setupUI(auth.currentUser)

    // button.style.display='none';
    Array.from(categorySelectButtons).forEach(btn => btn.style.display = 'none')
  })
})

const signOutAndReload = () => {
  auth.signOut()
  location.reload()
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}