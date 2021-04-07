//POST request
function makePost() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    //201 is the fake API's 'ready' number
    if (this.readyState === 4 && this.status === 201) {
      //   console.log(this.responseText);
      //gives a success message on page once info is received
      document.getElementById(
        "successContainer"
      ).innerHTML = `<h2>We've received your information!</h2>`;
      //removes the form from page once info is received
      //   document.querySelector("form").style.display = `none`;
    }
  };
  ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
  //need this when making a "post" request
  ajax.setRequestHeader("Content-Type", "application/json");
  //set the user's input into variables for later use in creating the object
  let postTitle = document.getElementById("postTitle").value;
  let postText = document.getElementById("postText").value;
  //   console.log(postTitle);
  //   console.log(postText);
  //post the value of the user's input into the object that's on the API site
  let postObject = {
    title: postTitle,
    body: postText,
  };
  let postJSON = JSON.stringify(postObject);
  //send request
  ajax.send(postJSON);
}
//call the fn when the button is clicked
let postNow = document.getElementById("postBtn");
postNow.addEventListener("click", makePost);

//PATCH request
function updatePost() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 201) {
      console.log(this.responseText);
    }
  };
  //post is now given an ID once it's made
  ajax.open("PATCH", "https://jsonplaceholder.typicode.com/posts/1", true);
  //need this to patch a request
  ajax.setRequestHeader("Content-Type", "application/json");
  //updating the elements at these IDs with the new values
  let postTitle = document.getElementById("postTitle").value;
  let postText = document.getElementById("postText").value;
  console.log(postTitle);
  console.log(postText);
  //post the value of the user's input into the object that's on the API site
  let postObject = {
    title: postTitle,
    body: postText,
  };
  let postJSON = JSON.stringify(postObject);
  //send request
  ajax.send(postJSON);
}
let updateBtn = document.getElementById("udpateBtn");
updateBtn.addEventListener("click", updatePost);

function deletePost() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      //   console.log(this.status);
      console.log(this.responseText);
    }
  };
  ajax.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);
  ajax.send();
}
let deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", deletePost);

function getPosts() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      //   console.log(this.responseText);
      let responseTxtObj = JSON.parse(this.responseText);
      //   let responseTxtObj = this.responseText;
      //   console.log(responseTxtObj);
      for (i = 0; i < responseTxtObj.length; i++) {
        let allTitles = responseTxtObj[i].title;
        let allPosts = responseTxtObj[i].body;
        console.log(allPosts);
        document.getElementById(
          "allPostsContainer"
        ).innerHTML += `<h3>${allTitles}</h3>`;
        //this wasn't working without += for some reason but I can't explain why
        document.getElementById(
          "allPostsContainer"
        ).innerHTML += `<p>${allPosts}</p>`;
      }
    }
  };

  ajax.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
  ajax.send();
}
let getPostsBtn = document.getElementById("getPostsBtn");
window.addEventListener("load", getPosts);

// let responseTxt = JSON.parse(this.responseText);
// for (i = 0; i <= responseTxt.length; i++) {
//   let postBody = responseTxt[i].body;
//   console.log(postBody);
// }
