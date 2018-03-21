/* 
 * Comments Controller
 * Author: David Long
 * The purpose of this class is to listen for the user submitting comments forms 
 * and issue commands to the comments.js (Model) and render the results on the page (view)
 * 
 */

class CommentsController {
  constructor() {
    this.$addCommentForm = $('.add-comment')

  }

  init() {
    // kick off controller from here
    this.addCommentFormListener();
  }


  addCommentFormListener() {
    // create comment form listener code here

    // loop through forms 
    for(var i = 0; i < this.$addCommentForm.length; i++) {

    	// add an eventlistener to trigger a function on form submit
    	$(this.$addCommentForm[i]).submit(function(event){
    		event.preventDefault();

    		// grab the imageId + comment
    		var imageID = $(this).parent("ul").attr("data-id");
    		//var imageID = "image-" + rawID;
    		//var commentID = "comments-" + rawID;
    		var $commentDesc = $('#comment-description-' + imageID);

    		console.log("I need to add " + $($commentDesc).val() + " as a new comment");
    		// create a new Comment 
    		var myComment = new Comment($($commentDesc).val(), imageID);
    		//CommentsController.render(myComment);
    	});

    	
    }
  }
  render(commentObject) {
  	console.log(commentObject);
  	var imageId = $(commentObject).attr("data-id");
  	console.log(imageId);

  	$("#comments-"+ imageId).append('<li id="comment-' + imageId + '">' + this.commentContent + '</li>');
  	
  	return true;
  }
  
}

/*
`CommentsController.prototype.addCommentFormListener()`
  + iterates through each comment form and adds an eventlistener to trigger a function on form submit
  + function should grab the imageId + comment and create a new Comment with those arguments
  + execute the render function on that found image object to append the new comment
+ `CommentsController.prototype.render(commentObject)`
  + selects the appropriate `ul` for this comment to be added to
  + appends the new comment element to this `ul`
  + Don't try to copy the `ImagesController.render` function because that is implemented differently
*/

/*
<div class="image">
    <h2><button class="destroy-image">x</button>${this.title}</h2>
    <ul id="image-${this.id}" data-id="${this.id}">
      <img src="${this.url}"></img>
      <ul id="comments-${this.id}"></ul>
      <form id="add-comment" class="add-comment" data-id=${this.id} action="#" method="post">
        <label for="comment-description">Comment: </label>
        <input type="text" id="comment-description-${this.id}" class="user-text" name="comment-description" placeholder="comment">
        <input type="submit" value="(+) add comment">
      </form>
    </ul>
  </div>

      var imageId = parseInt($(this).parents('h2').next('ul').data('id'));
     */