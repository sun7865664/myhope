<template>
  <ol  id="todoItem">
    <li v-for="(item, index) in items">
      {{item.message}}
    </li>
  </ol>
</template>
<script type="text/javascript">
  export default {
    name: 'todoItem',
    data () {
      return {
        items: [
          { message: 'Foo' },
          { message: 'Bar' },
          { message: 'something' },
        ],
      }
    },
  }
</script>
