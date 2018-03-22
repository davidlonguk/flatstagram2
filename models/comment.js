/*jshint esversion: 6 */
// comment model
class Comment {
  constructor(comment, imageId) {
  	this.imageId = imageId; 
  	this.commentContent = comment;
  	this.all = this.findAll(this.imageId);
    this.id = this.all.length;
    this.imageObj = this.findImage(this.imageId);
    this.init();
  }
  init() {
  	this.all.push({id: this.id, content: this.commentContent});
  }

  findImage(imageId) {
  	return Image.all[imageId];
  }

  findAll(imageId) {
    	
  		var allComments = [];
	  	
	  	for (var i = 0; i < $("#comments-" + imageId + "> li").length; i++) {
	  		
	  		var commentContent = $($("#comments-" + imageId + "> li")[i]).html();
	  		allComments.push({id: i, content: commentContent});
	  	}

	 	return allComments;
	}
 
  commentEl() {
  	var commentHTML = $("#comment-" + this.id).prop("outerHTML");
  	return commentHTML
  }
  
}
/*
Comment.prototype.findImage(imageId) {
	var imageEl = $("#image-" + imageId);
  	return imageEl;
}*/

/*
+ `new Comment(comment, imageId)`
  + should initialize with an id, image object (findImage) and commentContent (the actual text of the comment)
  + should save new comment to Comment.all property
+ `Comment.all`
  + should return all of the comment objects in an array
  + a property of the Comment class
+ `Comment.prototype.findImage(imageId)`
  + given an `int` for an image id, returns the image object with that id
  + before return - adds current comment to image's comments property
+ `Comment.prototype.commentEl()`
  + returns a string of html
    + html has an `li` tag with an `id` field and shows the comment
*/

/* 

<ul id="image-${this.id}" data-id="${this.id}">
      <img src="${this.url}"></img>
      <ul id="comments-${this.id}"></ul>
      <form id="add-comment" class="add-comment" data-id=${this.id} action="#" method="post">
        <label for="comment-description">Comment: </label>
        <input type="text" id="comment-description-${this.id}" class="user-text" name="comment-description" placeholder="comment">
        <input type="submit" value="(+) add comment">
      </form>
    </ul>
*/