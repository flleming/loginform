import request from 'https'



var request = new XMLHttpRequest();
request.open('GET', 'http://polls.apiblueprint.org/questions');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};
request.send();