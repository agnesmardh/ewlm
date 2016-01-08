Wishes = new Mongo.Collection("wishes");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    wishes: function () {
      return Wishes.find ({});
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
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}