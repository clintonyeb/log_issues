<template>
  <ol class="breadcrumb">
    <li ><span class="active">{{ list }}</span>
    <span ><b-button  v-bind:style="enablesave + 'margin-left: 72%;'" type="button" variant="primary" @click="primaryModal = true,showlogstosave()">Save Logs</b-button></span>
    <div class="float-right">
    <label class="switch switch-icon switch-pill switch-primary">
            <input @click="pauselog" type="checkbox" class="switch-input" checked="">
            <span class="switch-label" data-on="live " data-off=""></span>
            <span class="switch-handle"></span>
          </label>   
    </div>
    </li>
    <li><span class="active" style='margin-left: 28%;'> {{saveresponse}} </span></li>
        <b-modal title="Save and classify logs " class="modal-primary" v-model="primaryModal" @ok="primaryModal = false,savelogsapi()">
        Classify selected logs as :  
        <select v-model="selectedtext">
          <option  value=-1>Anomalies</option>
          <option value=0>Info</option>
          <option value=1>Warning</option>
          <option value=2>Error</option>
        </select>
    </b-modal>
  </ol>  
</template>
<script>
import nav from '../_nav'
export default {
  props: {
    list: ''
  },
  data: function () {
    return {
      clicks: 0,
      selectedtext: '',
      enablesave: 'display:none;',
      primaryModal: false,
      logs: nav.logs,
      saveresponse: '',
      logstosave: nav.logstosave
    }
  },
  methods: {
    connect_data (socketurl) {
      this.$store.state.currentSocket = socketurl
      this.$store.dispatch('addSocket', socketurl)
      this.$store.dispatch('attachListToSocket', {socketurl: socketurl, dataArray: this.logs, length: 20})
    },
    pauselog () {
      if (this.clicks === 0) {
        this.$store.dispatch('deleteSocket')
        this.clicks = 1
        this.enablesave = ''
        this.$store.state.enablesavelogs = true
      } else {
        this.connect_data(this.$store.state.currentSocket)
        this.clicks = 0
        this.enablesave = 'display:none;'
        this.$store.state.enablesavelogs = false
      }
    },
    savelogsapi () {
      var request = {
        classification_type: parseInt(this.selectedtext),
        log_id: this.$store.state.currentLog,
        logList: this.logstosave
      }
      console.log(request)
      this.$store.dispatch('save_log', request).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        if (data.Status === true) {
          this.saveresponse = 'Logs Saved successfully'
        } else {
          this.saveresponse = 'Couldnt save the logs'
        }
      })
    },
    showlogstosave () {
      for (let key in this.logstosave) {
        console.log(this.logstosave[key])
      }
    },
    computed: {
      enablesavelogs: function () {
        if (this.$store.state.enablesavelogs === true) {
          return ''
        } else {
          return 'display:none;'
        }
      },
      classification: function () {
        return this.selectedtext
      }
    }
  }
}
</script>
