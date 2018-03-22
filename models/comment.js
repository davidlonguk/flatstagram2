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
    // save new comment to Comment.all property ? reads from Image
    //this.all.push({id: this.id, content: this.commentContent});
  }


  // findImage - given an `int` for an image id, returns the image object with that id
  findImage(imageId) {
  	var imageObj = Image.all[imageId];

  	// add current comment to image's comments property
  	imageObj.comments.push({id: imageObj.comments.length, content: this.commentContent});

  	return imageObj;
  }

  
 	// returns a string of html
  commentEl() {
  	// html has an `li` tag with an `id` field and shows the comment
  	var commentHTML = '<li id="comment-' + this.imageId + "-" + this.id + '">' + this.commentContent + '</li>';

  	return commentHTML;
  }
  
}
