/*jshint esversion: 6 */
/* 
 * Comments Controller
 * Author: David Long
 * The purpose of this class is to listen for the user submitting comments forms 
 * and issue commands to the comments.js (Model) and render the results on the page (view)
 */


class CommentsController {
  constructor() {
    this.$addCommentForm = $('.add-comment');

  }

  init() {
    // kick off controller from here
    this.addCommentFormListener();
    
  }


  addCommentFormListener() {
    // create comment form listener code here

    // iterates through each comment form and adds an eventlistener to trigger a function on form submit
    this.$addCommentForm.submit(function(event){
    		event.preventDefault();
    		// grab the imageId + comment
    		var imageID = $(this).parent("ul").attr("data-id");
    		var commentDesc = $('#comment-description-' + imageID).val();

    		console.log("I need to add " + commentDesc + " as a new comment");
    		// create a new Comment using imageID + comment
    		var myComment = new Comment(commentDesc, imageID);
    		// console.log(myComment);

    		// passs the "image object" (probably means comment object) to the render function
    		//commentsController.render(myComment);
    		var aCommentController = new CommentsController();
    		aCommentController.render(myComment);
    	});
  }
  render(commentObject) {
  	//console.log(commentObject);
  	//Select the comments box with this id and add the commentObject comment content
  	$("#comments-"+ commentObject.imageId).append('<li id="comment-' + commentObject.imageId + '">' + commentObject.commentContent + '</li>');	
  	return;
  } 
}
