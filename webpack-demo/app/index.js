import Library from './library';
import component from './component';
import style1 from './style1.css';
import style2 from './style2.css';

// import 'react';

import  Vue from 'vue';
import TodoItem from './TodoItem.vue';

const div = document.createElement('div');
div.setAttribute('id', 'example');

document.body.append(component('1234561111',style1.class1,style2.class1));

document.body.appendChild(div);

new Vue({
  el: '#example',
  render: h => h(TodoItem),
});

//HMR
if(module.hot) {
  //Capture hot update
  module.hot.accept('./library', () => {
    console.log('Accepting the updated library module!');
    Library.log();
  });
}
