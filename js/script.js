const form = document.getElementById('form');
const comments = document.querySelector(".comments");
const storedComments = JSON.parse(localStorage.getItem('formData')) || [] ;



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
setInterval(()=>{
    if(initialArrayLengthChecker < storedComments.length || firstLoad){
        comments.innerHTML="";
    if (storedComments) {//Showing on the document
        storedComments.forEach((comment , i)=>{
        let newP= document.createElement('p');
         newP.classList.add('comment-p');
         newP.innerHTML=`
         <hr>
            <div class="single-comments">
            <h2>Comment No.${i+1}</h2>
         <p>Commenter's Name: ${comment.name}.</p>
         <p>Commenter's E-mail: ${comment.email}.</p>
         <p>Commenter's Phone: ${comment.phone}.</p>
         <p>Commenter's Comment: ${comment.text}.</p>
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

