var userPost = document.getElementById('title');
var userPostBody = document.getElementById('bodyText');
var parent = document.getElementById('appendPosts');
//Automatically retrieve all posts on page load by calling function getRequest()
getRequest();
patchRequest();
deleteRequest();

function postRequest(){
    axios.request({
        method : "POST",
        url : "https://jsonplaceholder.typicode.com/posts",
        headers:{
            "Content-Type": "application/json"
        },
        data:{
            title: userPost.value,
            body: userPostBody.value
        }
    }).then(postSuccess).catch(failure);
}

function postSuccess(response) {
    //Check inputbox for userinput and display appropriate message to user
    if(userPost.value && userPostBody.value != ""){
        console.log(response);
        document.getElementById('success').classList.add('successNotify');
        let myTitle = document.createElement('h3');
        let myData = document.createElement('h4');
        //append new post to end of the list (end of page)
        parent.append(myTitle);
        parent.append(myData);
        myTitle.innerText = response.data.title;
        myData.innerText = response.data.body;
        
        var lastElmnt = parent.lastElementChild;
        lastElmnt.scrollIntoView(true);
    }else {
        document.getElementById('missingInfo').classList.add('missingInfo');
    }
}

function patchRequest(){
    axios.request({
        method : "PATCH",
        url : "https://jsonplaceholder.typicode.com/posts/1",
        headers:{
            "Content-Type": "application/json"
        },
        data:{
            id : 2,
            title : "NEW TITLE",
            body : "I JUST UPDATED POST ID #2"
        }
    }).then(patchSuccess).catch(failure);
}

function deleteRequest(){
    axios.request({
        method : "DELETE",
        url : "https://jsonplaceholder.typicode.com/posts/1",
        headers:{
            "Content-Type": "application/json"
        },
        data:{
            id : 3
        }
    }).then(deleteSuccess).catch(failure);
}

function patchSuccess(response) {
    console.log(response);
    console.log("Patch Post Successful");
}

function deleteSuccess(response) {
    console.log(response);
    console.log("Delete Post Successful");
}

function failure(error) {
    console.error(error);
    document.getElementById('failure').classList.add('failureNotify');
}
//RETRIEVE ALL POSTS FUNCTION
function getRequest(){
    axios.request({
        method : "GET",
        url : "https://jsonplaceholder.typicode.com/posts",
    }).then(getSuccess).catch(failure);
}

function getSuccess(response) {
    console.log(response);
    for (let i=0; i < response.data.length; i++){
        let myData = document.createElement('h4');
        let myTitle = document.createElement('h3');

        myTitle.innerText = response.data[i].title;
        parent.append(myTitle);
        myData.innerText = response.data[i].body;
        parent.append(myData);
    }
    console.log("Retrieved ALL posts successfully!");
}

//ADD COMMENTS
commentsRequest()
function commentsRequest(){
    axios.request({
        method : "GET",
        url : "https://jsonplaceholder.typicode.com/posts/1/comments",
    }).then(commentsSuccess).catch(failure);
}

function commentsSuccess(response){
    console.log(response)
    var arr = document.querySelectorAll('h4');
    
    for(let i=0; i<5; i++) {
        let comments = document.createElement('h5');
        let currSelect = arr[i];
        currSelect.append(comments);
        comments.innerHTML = "Comments: "+response.data[i].body;
        comments.style.color = "blue";
    }
}

let userSubmitBtn = document.querySelector('button');
userSubmitBtn.addEventListener('click', postRequest);


