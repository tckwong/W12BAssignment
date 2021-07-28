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
    if(userPost.value && userPostBody.value != ""){
        console.log(response);
        document.getElementById('success').classList.add('successNotify');
        let myTitle = document.createElement('h3');
        let myData = document.createElement('h4');

        parent.append(myTitle);
        parent.append(myData);
        myTitle.innerText = response.data.title;
        myData.innerText = response.data.body;

        var lastElmnt = parent.lastElementChild;
        lastElmnt.scrollIntoView(true);
    }else {
        console.log('Please enter required information');
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
            body : "I JUST UPDATED ID 2'S BODY"
        }
    }).then(patchDeleteSuccess).catch(failure);
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
    }).then(patchDeleteSuccess).catch(failure);
}

function patchDeleteSuccess(response) {
    console.log(response);
}

function failure(error) {
    console.error(error);
    document.getElementById('failure').classList.add('failureNotify');
}

let userSubmitBtn = document.querySelector('button');
userSubmitBtn.addEventListener('click', postRequest);

//RETRIEVE ALL POSTS
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
    console.log("Get posts successful!");
}





