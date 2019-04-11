<template>
  <div id="app">
    <header>
      <span>Residencial Jardim da Colina</span>
    </header>
    <h4 class="mt-2"><b>Calendário de troca de lixo</b></h4>
    <main>
      <Calendar></Calendar>
    </main>
  </div>
</template>

<script>
import Calendar from './components/Calendar'

export default {
  name: 'app',
  components: {
    Calendar
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 23px;
  line-height: 1;
  letter-spacing: .02em;
  box-sizing: border-box;
  padding-top: 16px;
  font-weight: bold;
}

</style>
