const form = document.getElementById('form');
const comments = document.querySelector(".comments");
let storedComments = JSON.parse(localStorage.getItem('formData')) || [] ;
let firstLoad=true;
// let duplicateCommentAlert = false;
let duplicateCommentAlertEl= document.createElement("p");
let editCommentMode = false;
let editComment_previouseComment = {};



form.addEventListener('submit', (e)=>{//form submission handler;
  e.preventDefault();
 //clearing duplicate error alertelement------
  duplicateCommentAlertEl.innerHTML && form.removeChild(duplicateCommentAlertEl);
  duplicateCommentAlertEl.innerHTML="";
  //------
  const formData = new FormData(form);
  console.log(typeof formData);
  const obj = {};
  formData.forEach((value, key)=>{
    obj[key] = value;
  })
  console.log(obj);
  
  //Clearing Form Input Elements------
  form.reset();
  //------


  //duplicate Comment alert----
  if(storedComments.find((comment)=> comment.name === obj.name && comment.email === obj.email && comment.phone === obj.phone && comment.text === obj.text)){
    duplicateCommentAlertEl.innerHTML="<hr>The Comment Already Exists.<br><hr><br>";
    duplicateCommentAlertEl.style.textAlign = "center";
    duplicateCommentAlertEl.style.fontSize = "20px";
    duplicateCommentAlertEl.style.color = "red";
    form.appendChild(duplicateCommentAlertEl);
    return;
  }

  //Edit Comment handling-----
    if(editCommentMode){
      // [Note] If the comment remained unedited and submitted again, the dupicate alert section will kick in and skip the whole function. So we don't need to check for that. Also, this edit handling section will kick in before the maximum alert functionalities. So we don't need to check for that either. :) 
      let filteringEditComment = storedComments.filter((comment)=>{
        return comment.name === editComment_previouseComment.name && comment.email === editComment_previouseComment.email && comment.phone === editComment_previouseComment.phone && comment.text === editComment_previouseComment.text ? false : true;
      })
      storedComments = filteringEditComment;
      editCommentMode = false;
      editComment_previouseComment = {};
      firstLoad = true;
    }

  //maximum comments had already reached for a user alert-----
    const userTotalComments = storedComments.filter((comment)=> comment.name === obj.name && comment.email === obj.email && comment.phone === obj.phone);
    if(userTotalComments.length === 3){
      duplicateCommentAlertEl.innerHTML="<hr>The Comment Can't Be Added. The User Had Already Reached Maximum Comments(3).<br><hr><br>";
      duplicateCommentAlertEl.style.textAlign = "center";
      duplicateCommentAlertEl.style.fontSize = "20px";
      duplicateCommentAlertEl.style.color = "red";
      form.appendChild(duplicateCommentAlertEl);
      return;
    } 

  //-----

  //maximum comments reached for a user alert-----
  if(userTotalComments.length === 2){
    duplicateCommentAlertEl.innerHTML="<hr>The User Has Reached Maximum Comments(3). Further Comments Won't Be Added.<br><hr><br>";
    duplicateCommentAlertEl.style.textAlign = "center";
    duplicateCommentAlertEl.style.fontSize = "20px";
    duplicateCommentAlertEl.style.color = "blue";
    form.appendChild(duplicateCommentAlertEl);
    
  } 

//-----

//duplicate number alert- if the submitted number exists already and the name or the email field doesn't match, the show an alert message--------
  if(storedComments.find((comment)=> comment.phone === obj.phone && (comment.name !== obj.name || comment.email !== obj.email))){
    duplicateCommentAlertEl.innerHTML="<hr>The Number Already Exists.<br><hr><br>";
    duplicateCommentAlertEl.style.textAlign = "center";
    duplicateCommentAlertEl.style.fontSize = "20px";
    duplicateCommentAlertEl.style.color = "red";
    form.appendChild(duplicateCommentAlertEl);
    return;
  }

  //-------



  storedComments.unshift(obj);
  localStorage.setItem('formData', JSON.stringify(storedComments));
})//form submission handler -----END;


let initialArrayLengthChecker = storedComments.length;

let justOneDeleteCheck = 0;
let deleteComment = (name , email , phone , text)=>{ // , email , phone , text
      console.log(text);
      
     storedComments = storedComments.filter((comment)=>{
      justOneDeleteCheck = comment.name === name && comment.email === email && comment.phone === phone && comment.text === text ? justOneDeleteCheck + 1 : justOneDeleteCheck;
        return comment.name === name && comment.email === email && comment.phone === phone && comment.text === text &&justOneDeleteCheck===1 ? false : true;
      })
      console.log(storedComments)
      firstLoad = true;
      justOneDeleteCheck = 0;
}

let editComment = (name , email , phone , text)=>{
    let formName = document.getElementById('name');
    let formEmail = document.getElementById('email');
    let formPhone = document.getElementById('phone');
    let formText = document.getElementById('text');
    formName.value = name;
    formEmail.value = email;
    formPhone.value = phone;
    formText.value = text;
    
    editCommentMode = true;
    editComment_previouseComment = {
        name : name,
        email : email,
        phone : phone,
        text : text
    }

    window.location = '#contact';
}

// let deleteComment =(text)=>{
//   return console.log("Click worked " + text);
// }

setInterval(()=>{
  //duplicate Comment alert----
  // if(duplicateCommentAlert){
  //   alert("Comment already exists");
  //   duplicateCommentAlert = false;
  // } 
  //-----
    if(initialArrayLengthChecker < storedComments.length || firstLoad){
      localStorage.setItem('formData', JSON.stringify(storedComments));
        comments.innerHTML="";
    if (storedComments) {//Showing on the document
        storedComments.forEach((comment , i)=>{
        let newP= document.createElement('p');
         newP.classList.add('comment-p');
         newP.innerHTML=`
         <hr>
            <div class="single-comments">
            <h2>Comment No.${i+1}</h2>
         <p><b>Commenter's Name: </b>${comment.name}.</p>
         <p><b>Commenter's E-mail: </b>${comment.email}.</p>
         <p><b>Commenter's Phone: </b>${comment.phone}.</p>
         <p><b>Commenter's Comment: </b>${comment.text}.</p>
         <input type="submit" value="Delete" onclick="deleteComment('${comment.name}' , '${comment.email}' , '${comment.phone}' , '${comment.text}')">
        
         <input type="submit" value="Edit" onclick="editComment('${comment.name}' , '${comment.email}' , '${comment.phone}' , '${comment.text}')">

        
            </div>
            <hr>
         `
         comments.appendChild(newP);
    
        })
       
    }//Showing on the document -----END
    }
    firstLoad=false;
    initialArrayLengthChecker = storedComments.length;
}, 500)


//  , '${comment.email}' , '${comment.phone}' , '${comment.text}'