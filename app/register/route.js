import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    add: function(){
      console.log('Saving!!!');

      var user = this.store.createRecord('user', {
        name: this.controller.get('name')
      });

      user.save().then(() => {
        console.log('Save succcessful');
        this.controller.set('message', 'A new user with name ' + this.controller.get('name') + ' has been created');
        this.controller.set('name', null);
      }, function(){
        console.log('Save Failed');
      });
    }
  }
});
