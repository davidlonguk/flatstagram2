/*jshint esversion: 6 */

// Author: David Long

// Comments Controller
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
        // var imageObj = myComment.imageObj;
        // console.log(imageObj.comments);
        var aCommentController = new CommentsController();
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

// Comment model
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