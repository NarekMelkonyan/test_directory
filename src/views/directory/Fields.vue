<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardHeader>
          <strong>Create Directory</strong>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol class="md-6">
                <CInput
                    :class="{ 'is-invalid': submitted && $v.form.name.$error }"
                    v-model="form.name"
                    description="Insert Name"
                    label="Name"
                    horizontal
                    placeholder="Insert Name"
                />
                <div v-if="submitted && $v.form.name.$error" class="invalid-feedback mb-2">
                  <span v-if="!$v.form.name.required">Name is required</span>
                </div>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Type</label>
                    <div class="col-sm-9">
                      <select class="form-control" v-model="form.type">
                        <option v-for="item in directoryType" :value="item.text">{{ item.text }}</option>
                      </select>
                      <small class="form-text text-muted w-100">Insert Type</small>
                    </div>
                  </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Language</label>
                  <div class="col-sm-9">
                    <select class="form-control" v-model="form.lang">
                      <option v-for="item in directoryLang" :value="item.text">{{ item.text }}</option>
                    </select>
                    <small class="form-text text-muted w-100">Insert Language</small>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol md="12">
      <div class="row mb-5">
        <div class="col-md-8"></div>
        <div class="col-md-2">
          <CButton class="btn btn-square btn-block btn-dark btn_save" @click="save">
            <CIcon name="cil-save" class="mr-2"/>
            <span class="btn_save_text">Save</span>
          </CButton>
        </div>

        <div class="col-md-2">
          <CButton class="btn btn-square btn-block btn-secondary btn_save_cancel" @click="backToDashboard">
            <CIcon name="cil-action-undo" class="mr-2"/>
            <span class="btn_save_cancel_text">Cancel</span>
          </CButton>
        </div>
      </div>
    </CCol>
  </CRow>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {mapActions} from "vuex";

export default {
  name: "Fields",

  props: ['checkPage', 'data'],

  data() {
    return {
      directoryType: [
        {'id' : 1, 'text' : 'google'},
        {'id' : 2, 'text' : 'apple'},
        {'id' : 3, 'text' : 'yandex'},
        {'id' : 4, 'text' : 'safari'},
      ],
      directoryLang: [
        {'id' : 1, 'text' : 'Ru'},
        {'id' : 2, 'text' : 'En'},
        {'id' : 3, 'text' : 'Is'},
        {'id' : 4, 'text' : 'De'},
      ],
      submitted: false,
      errors: null,
      form: {
        name: '',
        type: '',
        lang: '',
      },
      directoryData: []

    }
  },

  validations: {
    form: {
      name: {required},
    }
  },

  methods: {
...mapActions(['addDirectory']),
    backToDashboard() {
      this.$router.push('/')
    },

    save() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.checkPage == 'edit') {
        let getDirectory = localStorage.getItem('directory')

        let i = JSON.parse(getDirectory).map(item => item.name).indexOf(this.data.name)
        this.directoryData.splice(i, 1)
        let updateResult = {
          "name" : this.form.name,
          "type" : this.form.type,
          "lang" : this.form.lang
        }
        this.directoryData.unshift(updateResult)
        localStorage.setItem('directory', JSON.stringify(this.directoryData))
            this.$swal.fire({
              icon: 'success',
              title: 'Updated successfully',
              showConfirmButton: false,
              timer: 2000
            })
        this.addDirectory(true)
            document.getElementById('listDirectory').click()


      }

      if (this.checkPage == 'create') {
        if (localStorage.getItem('directory')) {
          const nameIsUniq = [...JSON.parse(localStorage.getItem('directory')).map(i => i.name)].includes(this.form.name)
          if (nameIsUniq) {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Name already exist',
            })
          } else {
            this.addJson()
            this.successAlert()
          }
        } else {
          this.addJson()
          this.successAlert()
        }
      }
    },
    addJson() {
      let data = {
        'name' : this.form.name,
        'type' : this.form.type,
        'lang' : this.form.lang,
      }
      this.directoryData.push(data)
      localStorage.setItem('directory', JSON.stringify(this.directoryData))
      this.addDirectory(true)
    },

    successAlert(){
      this.$swal.fire({
        icon: 'success',
        title: 'Created successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.form.id ++
      this.form.name = ''
      this.form.type = ''
      this.form.lang = ''
      this.submitted = false
      this.errors = false
      document.getElementById('listDirectory').click()
    }
  },

  created() {
    if(localStorage.getItem('directory')){
      this.directoryData = JSON.parse(localStorage.getItem('directory'))
    }

    if (this.checkPage == 'edit') {
      if (this.data) {
        this.form.name = this.data.name
        this.form.type = this.data.type
        this.form.lang = this.data.lang
      }
    }
  },
}
</script>