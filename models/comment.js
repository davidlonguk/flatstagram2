/*jshint esversion: 6 */
// comment model

class Comment {
  constructor(comment, imageId) {
  	// initialize with an id, image object (findImage) and commentContent (the actual text of the comment)
  	this.imageId = imageId; 
  	this.commentContent = comment;
  	// this.all = this.findAll(this.imageId);
    
    this.imageObj = this.findImage(this.imageId);
    this.all = this.imageObj.comments;

    this.id = this.all.length -1;
    console.log("comment id: " + this.id);
    // save new comment to Comment.all property
    //this.all.push({id: this.id, content: this.commentContent});
  }


  // findImage - given an `int` for an image id, returns the image object with that id
  findImage(imageId) {
  	var imageObj = Image.all[imageId];

  	// add current comment to image's comments property
  	imageObj.comments.push({id: imageObj.comments.length, content: this.commentContent});

  	return imageObj;
  }

  findAll(imageId) {
  		// return all of the comment objects in an array
  		var allComments = [];	
	  	for (var i = 0; i < $("#comments-" + imageId + "> li").length; i++) {	  		
	  		var commentContent = $($("#comments-" + imageId + "> li")[i]).html();
	  		allComments.push({id: i, content: commentContent});
	  	}
	 	return allComments;
	}
 	// returns a string of html
  commentEl() {
  	// html has an `li` tag with an `id` field and shows the comment
  	//var commentHTML = $("#comment-" + this.id).prop("outerHTML");
  	var commentHTML = '<li id="comment-' + this.id + '">' + this.commentContent + '</li>';

  	return commentHTML;
  }
  
}
