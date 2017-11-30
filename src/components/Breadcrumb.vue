<template>
  <ol class="breadcrumb">
     </b-modal>
      <b-modal title="Save and classify logs " class="modal-primary" v-model="saveLogsModal" @ok="saveLogsModal = false,savelogsapi()">
        Classify selected logs as :  
        <select v-model="selectedtext">
          <option value=0 selected>Info</option>
          <option value=1>Warning</option>
          <option value=2>Error</option>
        </select>
    </b-modal>
       <b-modal title="Link logs to issue" class="modal-primary" v-model="linkLogsModal" @ok="linkLogsModal  = false,savelogsapi()">  
   <!--     <form class="form-inline">
        <div class="row">
        <div class="col-lg-12">
        <b-form-fieldset>
        <b-form-input type="value" id="name" placeholder="Enter issue id"></b-form-input>
        <b-button  v-bind:style="enablesave" type="button" variant="primary" @click="linkLogsModal = true,showlogstosave()"></i>&nbsp;Load Issue</b-button>
        </b-form-fieldset>
        </div>
        </div>
        <hr>
        <br>
        <br>
        <div></div>
        
</form> -->
    <b-card>
          <div class="row">
            <div class="col-sm-12">
              <b-form-fieldset label="">
                 <b-input-group>
              <b-form-input type="value" placeholder="Issue Id"></b-form-input>
              <!-- Attach Right button -->
              <b-input-group-button slot="right">
                <b-button variant="primary">Search</b-button>
              </b-input-group-button>
            </b-input-group>
          </b-form-fieldset>
              </b-form-fieldset>
            </div>
          </div><!--/.row-->
          <div class="row">
            <div class="col-sm-12">
              <b-form-fieldset label="Issue Title">
                <b-form-input disabled type="textarea" id="title" placeholder="" :rows="2" ></b-form-input>
              </b-form-fieldset>
            </div>
          </div><!--/.row-->
          <div class="row">
            <div class="col-sm-12">
              <b-form-fieldset label="Description">
                <b-form-input disabled type="textarea" id="issue_description" placeholder="" :rows="3" ></b-form-input>
              </b-form-fieldset>
            </div>
          </div><!--/.row-->
             <div class="row">
            <div class="col-sm-12">
              <b-form-fieldset label="Status">
                <b-form-input disabled type="text" id="issue_status" placeholder=""></b-form-input>
              </b-form-fieldset>
            </div>
          </div><!--/.row-->
          <div class="row">
            <div class="col-sm-12">
              <b-form-fieldset label="Resolution">
                <b-form-input  disabled type="textarea" id="issue_resolution" placeholder="" :rows="5"></b-form-input>
              </b-form-fieldset>
            </div>
          </div><!--/.row-->
         
        </b-card>
      
    </b-modal>
    <li ><span class="active">{{ list }}</span>
    <notifications position="top center" width = "300"/>
     <b-button  v-bind:style="enablesave + 'margin-left: 65%;'" type="button" variant="outline-primary" @click="saveLogsModal = true,showlogstosave()"><i class="fa fa-th"></i>&nbsp;Classify</b-button>
     <b-button  v-bind:style="enablesave" type="button" variant="outline-primary" @click="linkLogsModal = true,showlogstosave()"><i class="fa fa-link"></i>&nbsp;Link Issues</b-button>
    <div class="float-right">
    <label class="switch switch-icon switch-pill switch-primary">
            <input @click="pauselog" type="checkbox" class="switch-input" checked="">
            <span class="switch-label" data-on="live " data-off=""></span>
            <span class="switch-handle"></span>
          </label>   
    </div>
    </li>
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
      linkLogsModal: false,
      saveLogsModal: false,
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
    create_save_logs_array () {
      var returnObject = []
      for (var i = 0; i < this.logstosave.length; i++) {
        console.log(this.logstosave[i])
        var jobj = this.logstosave[i]
        var obj = {}
        obj.log_text = jobj.message
        // var classificationInfo = jobj.classification_info
        // var obj3 = JSON.parse(classificationInfo)
        // obj.classification_id = obj3.classification_id
        returnObject.push(obj)
      }
      return returnObject
    },
    savelogsapi () {
      var logList = this.create_save_logs_array()
      var request = {
        classification_type: parseInt(this.selectedtext),
        log_id: this.$store.state.currentLog,
        logList: logList
      }
      console.log(request)
      this.$store.dispatch('save_log', request).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        if (data.Status === true) {
          this.$notify({
            type: 'success',
            text: 'Saved and classified logs successfully'
          })
        } else {
          this.$notify({
            type: 'error',
            text: 'Failed to save logs'
          })
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
