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
        //commentsController.render(myComment);
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
    }
  } 
}

// Comment model
class Comment {
  constructor(comment, imageId) {
    // initialize with an id, image object (findImage) and commentContent (the actual text of the comment)
    this.imageId = imageId; 
    this.commentContent = comment;
    this.all = this.findAll(this.imageId);
    this.id = this.all.length;
    this.imageObj = this.findImage(this.imageId);
    // save new comment to Comment.all property
    this.all.push({id: this.id, content: this.commentContent});
  }


  // findImage - given an `int` for an image id, returns the image object with that id
  findImage(imageId) {
    var imageObj = Image.all[imageId];

    // add current comment to image's comments property
    imageObj.comments.push({id: this.id, content: this.commentContent});

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