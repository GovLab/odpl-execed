////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////


Vue.use(VueMeta);

new Vue({
    
  el: '#home-page',

  data () {
  
    return {
      facultyData: [],
      showMessage: true,
      index_active:0,
      apiURL: 'https://directus.thegovlab.com/odpl_course',
    }
  },

  created: function created() {

    this.fetchFaculty();
    this.toggleMessage();
  },


  methods: {
    fetchFaculty() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "odpl_course",
        storage: window.localStorage
      });

      client.getItems(
  'faculty',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.facultyData = data.data;
})
.catch(error => console.error(error));
    },
    toggleMessage (index) {
      this.index_active = index;
    	this.showMessage = !this.showMessage
    }
   
}
});


