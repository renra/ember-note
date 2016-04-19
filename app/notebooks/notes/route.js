import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return this.store.query('note', { notebook: params.notebook_id });
  },

  actions: {
    addNote: function(){
    }
  }
});
