import Library from './library';
import component from './component';
import style1 from './style1.css';
import style2 from './style2.css';

// import 'react';

import  Vue from 'vue';

// import TodoItem from './TodoItem.vue';
// import Home from './Home.vue';
// import About from './About.vue';

import routes from './routes.js';

const div = document.createElement('div');
div.setAttribute('id', 'example');

document.body.append(component('这是什么',style1.class1,style2.class1));

document.body.appendChild(div);

const player = document.createElement('div');
player.setAttribute('id', 'player');

document.body.appendChild(player);

//文件选择框
const input = document.createElement('input');
input.setAttribute('id', 'Files');
input.setAttribute('type', 'file');
input.setAttribute('multiple', 'multiple');

document.body.appendChild(input);
const fileListDiv = document.createElement('div');
fileListDiv.setAttribute('id', 'Lists');
document.body.appendChild(fileListDiv);
// import file from 'D:/CloudMusic/Jam - 差三岁.mp3';
// var fileUrl = window.URL.createObjectURL(file);
// console.log('fileUrl', fileUrl);
var fileUrlList;
function fileSelect(e) {
  e = e || window.event;
  fileUrlList=['http://127.0.0.1:8080/飘向北方.m4a'];

  var files = e.target.files;  //FileList Objects
  var output = [];

  for(var i = 0; i<files.length; i++) {
    var f = files[i];
    output.push('<li id="song_' + (i + 1) + '"><strong>' + f.name + '</strong>(' + f.type + ') - ' + f.size +' bytes</li>');
    var fileUrl = window.URL.createObjectURL(f);
    console.log('fileUrl', fileUrl);
    fileUrlList.push(fileUrl);
  }

  document.getElementById('Lists').innerHTML = '<ul>' + output.join('') + '</ul>';
  var liObjs =  document.querySelectorAll('#Lists li');
  for(let j = 0; j < liObjs.length; j++) {
    var obj = liObjs[j];
    obj.addEventListener('click', function () {
      let li = event.target;
      let liId = li.getAttribute('id') ? li.getAttribute('id') : li.parentNode.getAttribute('id');
      console.log(li, liId);
      let id = liId.replace('song_', '');
      count = id;
      console.log('id', id);
      chimee.load(fileUrlList[id]);
      chimee.play();
    }, false);
  }
}

if(window.File && window.FileList && window.FileReader && window.Blob) {
  document.getElementById('Files').addEventListener('change', fileSelect, false);
} else {
  document.write('您的浏览器不支持File Api');
}

import Chimee from 'chimee';
const chimee = new Chimee('#player');

// chimee.load('http://cdn.toxicjohann.com/lostStar.mp4');
var url = 'http://127.0.0.1:8080/飘向北方.m4a';
chimee.load(url);
chimee.play(); // play!!

var count = 0;

chimee.on('play', () => console.log('play!!'));
chimee.on('ended',nextSong);
chimee.on('error',nextSong);

function nextSong() {
  console.log(count);
  count++;
  if(count == fileUrlList.length) {
    count = 0;
  }
  chimee.load(fileUrlList[count]);
  chimee.play();
}

// const routes = {
//   '': Home,
//   '#about': About,
//   '#todo-item': TodoItem,
// };

new Vue({
  el: '#example',
  data: {
    currentRoute: window.location.hash,
  },
  computed: {
    ViewComponent () {
      // console.log('------------------',this.currentRoute,routes[this.currentRoute],routes);
      return routes[this.currentRoute] || require('./404.vue');
    },
  },
  render (h) { return h(this.ViewComponent); },
});

//HMR
if(module.hot) {
  //Capture hot update
  module.hot.accept('./library', () => {
    console.log('Accepting the updated library module!');
    Library.log();
  });
  module.hot.accept(Chimee, () => {
    chimee.load(url);
    chimee.play(); // play!!
  });
}
