<template>
  <div class="hello">
    <b-card v-if="!apto" class="ml-2 mr-2">
      <b-card-text>
        Se você deseja receber notificações na sua semana, adicione seu apartamento
      </b-card-text>
    <b-button v-b-modal.modal-prevent>Adicionar</b-button>
    </b-card>
    <vue-cal
      :time="false"
      :startWeekOnSunday="true"
      :disable-views="['years', 'year', 'day']"
      class="vuecal--green-theme mt-2"
      locale="pt-br"
      :events="events"
      :eventsOnMonthView="true"
    >
    </vue-cal>

    <!-- Modal Component -->
    <b-modal
      id="modal-prevent"
      ref="modal"
      title="Adicionar n° de apartamento"
      @ok="handleOk"
      @shown="clearName"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input v-model="apto" placeholder="Entre com seu apartamento"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

// const url = 'api/app/'

export default {
  components: { VueCal },
  name: 'Calendar',
  data () {
    return {
      events: [],
      apto: ''
    }
  },
  created () {
    // this.getEvents(url)
    this.apto = localStorage.getItem('apto')
    // this.checkDay()

    self.addEventListener('push', this.displayNotification)

    this.createNotificationSubscription()
  },
  methods: {
    getEvents (url) {
      axios.get(url)
        .then((res) => {
          this.events = res.data
        })
        .catch((e) => console.log(e))
    },
    clearName () {
      this.apto = ''
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.apto) {
        alert('Por favor, entre com seu apartamento')
      } else {
        localStorage.setItem('apto', this.apto)
        Notification.requestPermission()
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
        this.$refs.modal.hide()
      })
    },
    displayNotification () {
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then((reg) => {
          var options = {
            body: 'Boa noite, amanhã é o seu dia de trocar o lixo. Obrigado!',
            icon: './static/img/icons/favicon-32x32.png'
          }
          reg.showNotification('Jardim da Colina', options)
        })
      }
    },
    createNotificationSubscription () {
      const publicKey = 'BAuTSW2A6oxQFnXdeLeYMoucLtN9NfQVSW742Z0kVX0i5KWrZKgld6aUjtJCNY0Qn4A6gcOwfZh3Z4JJup8CR8c'
      navigator.serviceWorker.ready.then(function (serviceWorker) {
        serviceWorker.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
          })
          .then(function (subscription) {
            console.log('User is subscribed.', subscription)
            axios.post('api/subscribe', subscription)
          })
          .catch((err) => {
            console.log('erro.', err)
          })
      })
    }
    // checkDay () {
    //   setInterval(this.displayNotification, 10000)
    //   // var day = new Date().getDay()
    //   // if (day === 2) {
    //   //   setInterval(this.displayNotification, 5000)
    //   // }
    // }
    // checkApto () {
    //   if (this.apto) {
    //   }
    // },
    // checkDate () {
    //   var date = new Date().getDate()
    // }
  }
}
</script>

<style>
.vuecal__cell {
  padding: 20px 0;
}
.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}
.vuecal__event.health {
  background-color: rgba(221, 238, 255, 0.6);
  border: 1px solid rgb(144, 210, 190);
}
.vuecal__cell-date {
  font-size: 1.8em;
  font-weight: bold;
}
</style>
