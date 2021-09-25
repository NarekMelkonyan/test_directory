<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CTabs>
              <CTab id="listDirectory">
                <template slot="title">
                  <CIcon name="cil-list-numbered"/>
                  Directory Lists
                </template>
                <CCard>
                  <CCardBody>
                    <CDataTable
                        :items="items"
                        tableFilter
                        footer
                        :border="true"
                        :sorter="true"
                        itemsPerPageSelect
                        :fields="fields"
                        :items-per-page="small ? 10 : 5"
                        pagination
                    >
                      <template #show_details="{item}">
                        <td class="box_action">
                          <div @click="editElement(item)">
                            <CIcon size='lg' class="pencil" name="cil-pencil"/>
                          </div>
                          <div @click="removeElement(item.name)">
                            <CIcon size='lg' class="trash" name="cil-trash"/>
                          </div>

                        </td>
                      </template>
                    </CDataTable>
                  </CCardBody>
                </CCard>
              </CTab>
              <CTab id="createDirectory">
                <template slot="title">
                  <CIcon name="cil-plus"/>
                  Create Directory
                </template>
                <create></create>
              </CTab>
              <CTab id="editDirectory" v-show="showEdit">
                <template slot="title">
                  <CIcon name="cil-pencil"/>
                  Edit Directory
                </template>
                <edit v-if="openEdit" :data="editData"></edit>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Create from './Create'
import Edit from './Edit'
import {mapGetters} from "vuex";

export default {
  name: 'Index',

  components: {
    Create,
    Edit,
  },

  data() {
    return {
      editData: '',
      openEdit: false,
      showEdit: false,
      items: [],
      fields: [
        {key: 'name'},
        {key: 'type'},
        {key: 'lang'},
        {
          key: 'show_details',
          label: 'Action',
          _style: {width: '1%'},
          sorter: false,
          filter: false
        }

      ],

      hover: Boolean,
      striped: Boolean,
      small: Boolean,
      fixed: Boolean,
      activeTab: 1

    }
  },
methods: {
  removeElement(name) {
    let i = this.items.map(item => item.name).indexOf(name)
    this.items.splice(i, 1)
    localStorage.setItem('directory', JSON.stringify(this.items))
  },

  editElement(data){
    document.getElementById('editDirectory').click()
    this.editData = data
    this.showEdit = true
    this.openEdit = true
  }
},

  watch: {
    getLists() {
        this.items = JSON.parse(localStorage.getItem('directory'));
      }
  },


  computed : {
    ...mapGetters(['getLists'])
  },

  mounted() {
    if(localStorage.getItem('directory')){
      this.items = JSON.parse(localStorage.getItem('directory'))
    }

    document.getElementById('createDirectory').addEventListener('click', () => {
      this.showEdit = false
      this.openEdit = false
    })
    document.getElementById('listDirectory').addEventListener('click', () => {
      this.showEdit = false
      this.openEdit = false
    })
  }
}
</script>

<style>
nav {
  float: right
}

a.nav-link {
  color: #8a93a2;
}

.trash {
  color: #e55353;
  cursor: pointer;
}

.pencil {
  cursor: pointer;
  color: #007bff;
}

.box_action {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
