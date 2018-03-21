class Comment {
  constructor(comment, imageId) {
  	
  	this.imageId = imageId; 
  	this.commentContent = comment;
  	this.all = this.findAll(this.imageId);
    this.id = this.all.length;
    this.imageObj = this.findImage(this.imageId);
    
  }
  init() {
  	
  }

  findImage(imageId) {
  	var imageEl = $("#image-" + imageId);
  	this.addComment();
  	var test = commentsController.render(this);
  	console.log(test);
  	return imageEl;
  }
  findAll(imageId) {
    	
  		var allComments = [];
	  	
	  	for (var i = 0; i < $("#comments-" + imageId + "> li").length; i++) {
	  		allComments.push($("#comments-" + imageId + "> li")[i]);
	  	}

	 	return allComments;
	}
  addComment() {
  	$("#comments-"+ this.imageId).append('<li id="comment-' + this.id + '">' + this.commentContent + '</li>');
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