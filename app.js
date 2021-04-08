//OMG I ACTUALLY DID IT I think?? My brain hurts but I'm happy I got this haha

//POST request
//makes a post
function makePost() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    //201 is the API's 'ready' number here
    if (this.readyState === 4 && this.status === 201) {
      //   console.log(this.responseText);
      //gives a success message on page once info is received
      document.getElementById(
        "successContainer"
      ).innerHTML = `<h2>We've received your information!</h2>`;
    }
  };
  //post is given an ID once it's made
  ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
  //need this when making a "post" request
  ajax.setRequestHeader("Content-Type", "application/json");
  //set the user's input into variables for later use in creating the object
  let postTitle = document.getElementById("postTitle").value;
  let postText = document.getElementById("postText").value;
  //post the value of the user's input into the object that's on the API site
  let postObject = {
    title: postTitle,
    body: postText,
  };
  //makes the object into a string so it can be read by the server
  let postJSON = JSON.stringify(postObject);
  ajax.onloadstart = function loading() {
    document.getElementById("loading").innerHTML = `<h2>Loading...</h2>`;
    document.getElementById("loading").style.display = `block`;
  };
  ajax.onloadend = function loaded() {
    document.getElementById("loading").style.display = `none`;
  };
  ajax.onerror = function () {
    document.getElementById(
      "loading"
    ).innerHTML = `<h2>Sorry, we cannot complete your post</h2>`;
  }; //send request
  ajax.send(postJSON);
}
//call the fn when the button is clicked
let postNow = document.getElementById("postBtn");
postNow.addEventListener("click", makePost);

//PATCH request -updates post
function updatePost() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById(
        "successContainer"
      ).innerHTML = `<h2>We've updated your post!</h2>`;
    }
  };
  //updates post with the id of 1
  ajax.open("PATCH", "https://jsonplaceholder.typicode.com/posts/1", true);
  //need this to patch a request too
  ajax.setRequestHeader("Content-Type", "application/json");
  //updating the elements at these IDs with the new values
  let postTitle = document.getElementById("postTitle").value;
  let postText = document.getElementById("postText").value;
  console.log(postTitle);
  console.log(postText);
  //post the updated values of the user's input into the object that's on the API site
  let postObject = {
    title: postTitle,
    body: postText,
  };
  //makes the object into a string so it can be read by the server
  let postJSON = JSON.stringify(postObject);
  ajax.onloadstart = function loading() {
    document.getElementById("loading").innerHTML = `<h2>Loading...</h2>`;
    document.getElementById("loading").style.display = `block`;
  };
  ajax.onloadend = function loaded() {
    document.getElementById("loading").style.display = `none`;
  };
  ajax.onerror = function () {
    document.getElementById(
      "loading"
    ).innerHTML = `<h2>Sorry, we cannot update your post</h2>`;
  };
  //send request
  ajax.send(postJSON);
}

let updateBtn = document.getElementById("udpateBtn");
updateBtn.addEventListener("click", updatePost);

//function to delete the post with the id of '1'
function deletePost() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById(
        "successContainer"
      ).innerHTML = `<h2>We've deleted your post!</h2>`;
      console.log(this.responseText);
    }
  };
  ajax.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);
  ajax.onloadstart = function loading() {
    document.getElementById("loading").innerHTML = `<h2>Loading...</h2>`;
    document.getElementById("loading").style.display = `block`;
  };
  ajax.onloadend = function loaded() {
    document.getElementById("loading").style.display = `none`;
  };
  ajax.onerror = function () {
    document.getElementById(
      "loading"
    ).innerHTML = `<h2>Sorry, we cannot update your post</h2>`;
  };
  ajax.send();
}
let deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", deletePost);

//GIANT fn to get all 100 of the posts
//sorry but I've declared two functions within this one function.......
function getPosts() {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let responseTxtObj = JSON.parse(this.responseText);
      //this loop grabs all of the info for the post (including the ID because I need it to
      //change the URL to go to that post ID's comments)
      for (i = 0; i < responseTxtObj.length; i++) {
        let postTitle = responseTxtObj[i].title;
        let postBody = responseTxtObj[i].body;
        let postID = responseTxtObj[i].id;
        //new ajax variable for the second fetch - to grab the comments
        let ajaxComments = new XMLHttpRequest();
        ajaxComments.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            let responseTxtCommentObj = JSON.parse(this.responseText);
            for (i = 0; i < responseTxtCommentObj.length; i++) {
              let ID = responseTxtCommentObj[i].postId;
              //if the ID of the post matches the ID of the comments......
              if (ID === postID) {
                let postEmail = responseTxtCommentObj[i].email;
                let postName = responseTxtCommentObj[i].name;
                document.getElementById(
                  "allPostsContainer"
                ).innerHTML += `<h2>${postTitle}</h2>`;
                document.getElementById(
                  "allPostsContainer"
                ).innerHTML += `<p>${postBody}</p><h3> ${postEmail}</h3><h4>${postName}</h4>`;
              }
            }
          }
        };
        ajaxComments.open(
          "GET",
          //this is in {} because the post ID changes for every post
          `https://jsonplaceholder.typicode.com/posts/${postID}/comments`,
          true
        );
        ajaxComments.send();
      }
    }
  };
  ajax.open("GET", "https://jsonplaceholder.typicode.com/posts/", true);
  ajax.send();
}
//on page load, do dis function
window.addEventListener("load", getPosts);
