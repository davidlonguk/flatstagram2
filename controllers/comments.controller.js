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
    		var imageID = parseInt($(this).parent("ul").attr("data-id"));

    		// includes a basic way to prevent XSS or other nasties. If needed we could use a sanitizing library
    		var commentDesc = $( $.parseHTML( $('#comment-description-' + imageID).val() )).text();
    		
    		// create a new Comment using imageID + comment
    		var myComment = new Comment(commentDesc, imageID);

    		// passs the "image object" (probably means comment object) to the render function
    		var imageObj = myComment.imageObj;
    		console.log(imageObj.comments);
    		var aCommentController = new CommentsController();
    		aCommentController.render(myComment);
    	});
  }
  render(commentObject) {
  	//console.log(commentObject);
  	// check if comment has already been rendered
  	if ( $("#comment-" + commentObject.id).length ) {
  		// comment already exists add message to console 
  		console.log("Comment already rendered");
  		
  	} else {
  		//Select the comments box with this id and add the commentObject comment html	
  		$("#comments-"+ commentObject.imageId).append(commentObject.commentEl());
  		// optional fade in of new comment
  		$("#comment-"+ commentObject.id).css({opacity: 0});
  		$("#comment-"+ commentObject.id).animate({opacity: 1}, 500);

  	}
  } 
}
