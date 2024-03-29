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
      AlumniData: [],
      faqData:[],
      showMessage: true,
      index_active:0,
      apiURL: 'https://directus.thegovlab.com/odpl_course',
    }
  },

  created: function created() {

    this.fetchFaculty();
    this.fetchAlumni();
    this.toggleMessage();
    this.fetchQuestions();
  },


  methods: {
    fetchAlumni() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "odpl_course",
        storage: window.localStorage
      });

      client.getItems(
  'alumni',
  {
    fields: ['*.*']
  }
).then(data => {

  data.data.sort(function(a, b) {
    
    var textA = a.last_name.toUpperCase();
    var textB = b.last_name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;

  
});
  console.log(data)
  self.AlumniData = data.data;
})

.catch(error => console.error(error));
    },
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

  data.data.sort(function(a, b) {
    
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;

  
});
  console.log(data)
  self.facultyData = data.data;
})

.catch(error => console.error(error));
    },
    fetchQuestions() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "odpl_course",
        storage: window.localStorage
      });

      client.getItems(
  'faq',
  {
    fields: ['*.*']
  }
).then(data => {
  console.log(data)
  self.faqData = data.data;
})
.catch(error => console.error(error));
    },
    toggleMessage (index) {
      this.index_active = index;
    	this.showMessage = !this.showMessage
    }
   
}
});


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

