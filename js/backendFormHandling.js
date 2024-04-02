document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObj = {};
    formData.forEach((value, key) => formObj[key] = value);

    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        });

        if (response.ok) {
            console.log('Data submitted successfully');
            // You can perform any additional actions here, like showing a success message
        } else {
            console.error('Failed to submit data');
            // Handle error cases, show error message to the user, etc.
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error cases, show error message to the user, etc.
    }
});





document.addEventListener('DOMContentLoaded', async function() {
// Fetch comments from the backend API
try {
    const response = await fetch('/api/comments');
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    const comments = await response.json();
    displayComments(comments);
} catch (error) {
    console.error('Error:', error);
    // Handle error cases, show error message to the user, etc.
}
});

// Function to display comments in the HTML section
function displayComments(comments) {
const commentsSection = document.querySelector('.comments');
commentsSection.innerHTML = ''; // Clear existing content

comments.forEach((comment, index) => {
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');
    
    // commentContainer.innerHTML = `
    //     <div class="comment-header">
    //         <h3>Comment No.${index + 1}</h3>
    //         <p><strong>Name:</strong> ${comment.name}</p>
    //         <p><strong>Email:</strong> ${comment.email}</p>
    //         <p><strong>Phone:</strong> ${comment.phone}</p>
    //     </div>
    //     <div class="comment-body">
    //         <p>${comment.text}</p>
    //     </div>
    //     <div class="comment-actions">
    //         <button class="edit-comment-btn" onclick="editComment('${comment._id}')">Edit</button>
    //         <button class="delete-comment-btn" onclick="deleteComment('${comment._id}')">Delete</button>
    //     </div>
    // `;

    commentContainer.innerHTML = `
    <div class="single-comment-section">
    <hr>
    <div class="single-comments">
            <h2>Comment No.${index + 1}</h2>
            <p><b>Commenter's Name:</b> ${comment.name}.</p>
            <p><b>Commenter's E-mail:</b><span> ${comment.email.slice(0, 30).length < comment.email.length ? comment.email.slice(0, 30) + "..." : comment.email}.</span></p>
            <p><b>Commenter's Phone:</b> ${comment.phone}.</p>
        
        <div class="comment-body">
            <h3>Comment</h3><hr style='opacity:0.5'>
            <p style='justify-content:center'>${comment.text}</p>
        </div>
        <div class="button-container">
            <button class="edit-comment-btn" onclick="editComment('${comment._id}')">Edit</button>
            <button class="delete-comment-btn" onclick="deleteComment('${comment._id}')">Delete</button>
        </div>
        </div>
        <hr style='opacity:1'>
        </div><br>
    `;

    commentsSection.appendChild(commentContainer);
});
}



async function editComment(commentId) {
// Retrieve the comment details based on the commentId (you can fetch the details from your database)
const comment = await getCommentDetails(commentId); // Implement this function to retrieve comment details
async function getCommentDetails(commentId) {
try {
const response = await fetch(`/api/comments/${commentId}`);
if (!response.ok) {
    throw new Error('Failed to fetch comment');
}
const comment = await response.json();
console.log(comment)
return comment;
} catch (err) {
throw new Error(`Failed to fetch comment details: ${err.message}`);
}
}

// Create a form dynamically to edit the comment
const form = document.createElement('form');
form.innerHTML = `
<label for="edit-name">Name:</label>
<input type="text" id="edit-name" name="name" value="${comment.name}"><br><br>
<label for="edit-email">Email:</label>
<input type="email" id="edit-email" name="email" value="${comment.email}"><br><br>
<label for="edit-phone">Phone:</label>
<input type="text" id="edit-phone" name="phone" value="${comment.phone}"><br><br>
<label for="edit-text">Text:</label>
<textarea id="edit-text" name="text">${comment.text}</textarea><br><br>
<button type="button" onclick="updateComment('${commentId}')">Update</button>
`;

// Display the form in a dialog box
const dialog = document.createElement('dialog');
dialog.appendChild(form);
document.body.appendChild(dialog);
dialog.showModal();
}

function updateComment(commentId) {
// Retrieve the updated values from the form
const updatedName = document.getElementById('edit-name').value;
const updatedEmail = document.getElementById('edit-email').value;
const updatedPhone = document.getElementById('edit-phone').value;
const updatedText = document.getElementById('edit-text').value;

// Prepare the updated comment data
const updatedCommentData = {
name: updatedName,
email: updatedEmail,
phone: updatedPhone,
text: updatedText
};

// Send a PUT request to update the comment
fetch(`/api/comments/${commentId}`, {
method: 'PUT',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(updatedCommentData)
})
.then(response => {
if (!response.ok) {
    throw new Error('Failed to update comment');
}
return response.json();
})
.then(updatedComment => {
alert('Comment updated successfully');
// Optionally, you can close the dialog box here
const dialog = document.querySelector('dialog');
dialog.close();
})
.catch(error => {
console.error('Error updating comment:', error.message);
alert('Failed to update comment');
});
}

//deleting comment------ 
async function deleteComment(commentId) {
    // Ask for confirmation before deleting the comment
    const confirmed = confirm("Are you sure you want to delete this comment?");
    
    if (!confirmed) {
        return; // If not confirmed, exit the function
    }

    try {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // If the deletion is successful, remove the comment from the UI
            alert("Comment Deleted");
        } else {
            console.error('Failed to delete comment');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}





