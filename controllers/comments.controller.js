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
    		let imageID = parseInt($(this).parent("ul").attr("data-id"));

    		// includes a basic way to prevent XSS or other nasties. If needed we could use a sanitizing library
    		let commentDesc = $( $.parseHTML( $('#comment-description-' + imageID).val() )).text();
    		
        let imageComments = Image.all[imageID].comments;
        //console.log(imageComments.length);
        for(let i=0; i < imageComments.length; i++) {
              console.log(imageComments[i].content);
              if (imageComments[i].content == commentDesc) {
                  alert("Someone already made this same comment!");
                  return;
                } 
        }
        
        

    		// create a new Comment using imageID + comment
    		let myComment = new Comment(commentDesc, imageID);

    		// passs the "image object" (probably means comment object) to the render function
    		// var imageObj = myComment.imageObj;
    		// console.log(imageObj.comments);
    		let aCommentController = new CommentsController();
    		aCommentController.render(myComment);
    	});
  }
  render(commentObject) {



  	// check if comment has already been rendered
  	if ( $("#comment-"+ commentObject.imageId + "-" + commentObject.id).length ) {
  		// comment with this ID already exists add message to console 
  		console.log("Comment already rendered");


  		// possible method for allowing overwriting of existing comment
  		//$("#comment-" + commentObject.imageId + "-" + commentObject.id).html(commentObject.commentEl());
  	} else {
  		//Select the comments box with this id and add the commentObject comment html	
  		$("#comments-"+ commentObject.imageId).append(commentObject.commentEl());
  		
  		// optional fade in of new comment
  		$("#comment-"+ commentObject.imageId + "-" + commentObject.id).css({opacity: 0});
  		$("#comment-"+ commentObject.imageId + "-" + commentObject.id).animate({opacity: 1}, 500);
  	}
  } 
}
