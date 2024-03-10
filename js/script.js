const form = document.getElementById('form');
const comments = document.querySelector(".comments");
let storedComments = JSON.parse(localStorage.getItem('formData')) || [] ;



form.addEventListener('submit', (e)=>{//form submission handler;
  e.preventDefault();

  const formData = new FormData(form);
  console.log(typeof formData);
  const obj = {};
  formData.forEach((value, key)=>{
    obj[key] = value;
  })
  console.log(obj);
  storedComments.unshift(obj);
  localStorage.setItem('formData', JSON.stringify(storedComments));
})//form submission handler -----END;


let initialArrayLengthChecker = storedComments.length;
let firstLoad=true;
let deleteComment = (text)=>{ 
      console.log(text);
     storedComments = storedComments.filter((comment)=>{
        return comment.text !== text;
      })
      console.log(storedComments)
      firstLoad = true;
}

// let deleteComment =(text)=>{
//   return console.log("Click worked " + text);
// }

setInterval(()=>{
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
         <input type="submit" value="Delete" onclick="deleteComment('${comment.text}')">
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

