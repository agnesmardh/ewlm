Wishes = new Mongo.Collection("wishes");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    wishes: function () {
       if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Wishes.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Wishes.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Wishes.find({checked: {$ne: true}}).count();
    },
    isLoggedinUser: function (name) {
      //Implement function to check if logged in user is the creator of the wish
      return true;
    }
  });

  Template.body.events({
    "submit .new-wish": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a wish into the collection
      Wishes.insert({
        text: text,
        createdAt: new Date(), // current time
        owner: Meteor.userId(),
        username: Meteor.user().username || Meteor.user().profile.name
      });
 
      // Clear form
      event.target.text.value = "";
    },
     "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked); 
    }  
  });

Template.wish.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Wishes.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Wishes.remove(this._id);
    }
  });

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}