<template>
    <!-- SIMPLE CARD WITH TABS -->
    <div class="vx-col w-full md:w-1/1 mb-base">
        <vx-card collapse-action refresh-content-action @refresh="refreshCard">
            <div class="flex flex-wrap">
                <div class="w-full sm:w-1/1 md:w-1/1 lg:w-1/4 xl:w-1/4 flex sm:justify-center lg:justify-start">
                    <div class="btn-group mb-2">
                        <vs-button @click="popupActive=true" color="success">បន្ថែម</vs-button>
                        <vs-button :disabled="editableAble" @click="editUser" color="warning">កែប្រែ</vs-button>
                        <vs-button @click="removeUser" :disabled="deleteAble" color="danger">លុប</vs-button>
                    </div>
                </div>
                <div class="w-full sm:w-1/1 md:w-1/1 lg:w-1/2 xl:w-1/2 lg:justify-center flex">
                    <vs-input icon-no-border placeholder="Search" class="input-rounded-full w-full mb-2"
                              v-model="searchQuery" @keyup.enter="updateSearchQuery(searchQuery)" icon="icon-search"
                              icon-pack="feather"/>
                    <vs-dropdown vs-trigger-click class="cursor-pointer mb-3">
                        <div class="px-5 py-3 ml-2 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                            <span class="mr-2">{{currentItemsPerPage}}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
                        </div>
                        <vs-dropdown-menu>

                            <vs-dropdown-item v-if="totalUsers>20"
                                              @click="gridApi.paginationSetPageSize(20);currentItemsPerPage=20">
                                <span>20</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item v-if="totalUsers>50"
                                              @click="gridApi.paginationSetPageSize(50);currentItemsPerPage=50">
                                <span>50</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item v-if="totalUsers>100"
                                              @click="gridApi.paginationSetPageSize(100);currentItemsPerPage=100">
                                <span>100</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item
                                    @click="gridApi.paginationSetPageSize(totalRecords);currentItemsPerPage=totalUsers">
                                <span>ទាំងអស់</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                </div>
                <div class="w-full sm:w-1/1 md:w-1/1 lg:w-1/4 xl:w-1/4 lg:justify-end sm:justify-center flex">
                    <vs-button color="primary" type="line" icon-pack="feather" icon="icon-download"
                               @click="gridApi.exportDataAsCsv()">ទាញយក CSV
                    </vs-button>
                </div>
            </div>
            <ag-grid-vue
                    :gridOptions="gridOptions"
                    class="ag-theme-material my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="allUsers"
                    rowSelection="multiple"
                    :animateRows="true"
                    :pagination="true"
                    :paginationPageSize="itemsPerPage"
                    @selection-changed="onSelectionChanged"
            >
            </ag-grid-vue>
            <!--popup-->
            <vs-popup title="បន្ថែមអ្នកប្រើប្រាស់" :active.sync="popupActive">
                <form>
                    <div class="vx-row mb-2">
                        <div class="vx-col sm:w-1/2 w-full">
                            <vs-input class="w-full" v-validate="'required'" name="name" icon-pack="feather"
                                      icon="icon-user" icon-no-border label-placeholder="ឈ្មោះ" v-model="user.name"/>
                            <span class="text-danger text-sm"
                                  v-show="errors.has('name')">{{ errors.first('name') }}</span>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full">
                            <vs-select
                                    class="w-full"
                                    autocomplete
                                    @input-change=""
                                    label="ភេទ"
                                    v-model="user.gender"
                            >
                                <vs-select-item value="ប្រុស" text="ប្រុស"/>
                                <vs-select-item value="ស្រី" text="ស្រី"/>
                            </vs-select>
                        </div>
                    </div>
                    <div class="vx-row mb-2">
                        <div class="vx-col sm:w-1/2 w-full">
                            <vs-select
                                    class="w-full"
                                    autocomplete
                                    @input-change=""
                                    label="សិទ្ធ"
                                    v-model="user.role"
                            >
                                <vs-select-item value="user" text="User"/>
                                <vs-select-item value="admin" text="Admin"/>
                                <vs-select-item value="super_admin" text="Super Admin"/>
                            </vs-select>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full">
                            <vs-select
                                    class="w-full"
                                    autocomplete
                                    @input-change=""
                                    label="ប្រភេទ"
                                    v-model="user.type"
                            >
                                <vs-select-item value="employee" text="Employee"/>
                                <vs-select-item value="owner" text="Owner"/>
                                <vs-select-item value="developer" text="Developer"/>
                            </vs-select>
                        </div>
                    </div>
                    <div class="vx-row mb-2">
                        <div class="vx-col sm:w-1/2 w-full">
                            <vs-input type="email" v-validate="'required|email'" name="email" class="w-full"
                                      icon-pack="feather" icon="icon-mail" icon-no-border label-placeholder="អ៊ីម៉ែល"
                                      v-model="user.email"/>
                            <span class="text-danger text-sm"
                                  v-show="errors.has('email')">{{ errors.first('email') }}</span>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full">
                            <vs-input class="w-full" v-validate="'required'" name="telephone" icon-pack="feather"
                                      icon="icon-smartphone" icon-no-border label-placeholder="លេខទុរស័ព្ទ"
                                      v-model="user.telephone"/>
                            <span class="text-danger text-sm" v-show="errors.has('telephone')">{{ errors.first('telephone') }}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full" v-if="!isEdit">
                            <vs-input type="password" v-validate="'required'" name="password" class="w-full"
                                      icon-pack="feather" icon="icon-lock" icon-no-border label-placeholder="លេខសម្អាត់"
                                      v-model="user.password"/>
                            <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                        </div>
                        <div class="vx-col w-full" v-if="isEdit">
                            <vs-input type="password" name="password" class="w-full"
                                      icon-pack="feather" icon="icon-lock" icon-no-border label-placeholder="លេខសម្អាត់"
                                      v-model="user.password"/>
                        </div>
                    </div>
                    <div class="centerx">
                        <image-upload
                                :upload-url="'file.upload'"
                                @get-image-path="setThumb"
                                :image-src="user.profile?user.profile:placeholder"
                                class="mb-2"/>
                    </div>
                    <vs-divider/>
                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <vs-button v-if="!isEdit" @click.prevent="submitForm" type="relief" class="mr-3 mb-2">
                                បង្កើត
                            </vs-button>
                            <vs-button v-if="isEdit" @click.prevent="updateUser" type="relief" class="mr-3 mb-2">
                                កែប្រែ
                            </vs-button>
                            <vs-button v-if="!isEdit" @click.prevent="resetField" color="warning" type="relief"
                                       class="mb-2" @click="">
                                ចាកចេញ
                            </vs-button>
                        </div>
                    </div>
                </form>
            </vs-popup>
        </vx-card>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";
    import ImageUpload from "../../components/ImageUpload.vue";
    export default {
        components: {
            AgGridVue, ImageUpload
        },
        data() {
            return {
                /*user data*/
                user: {
                    profile: null,
                    gender: 'ប្រុស',
                    role: 'user',
                    type: 'employee',
                    name: '',
                    email: '',
                    telephone: '',
                    password: '',
                },
                deleteAble: true,
                editableAble: true,
                isEdit: false,
                /*\User data*/
                popupActive: false,
                itemsPerPage: 10,
                currentItemsPerPage: 10,
                columnDefs: null,
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    filter: true,
                },
                totalRecords: null,
                gridOptions: {},
                searchQuery: '',
                gridApi: null,
                columnApi: null,
                selectedRows: []
            }
        },
        /*computed*/
        computed: {
            allUsers() {
                return this.$store.getters.allUsers
            },
            totalUsers() {
                return this.$store.getters.totalUser
            },
            placeholder() {
                return this.$store.getters.getAppUrl + 'images/placeholder/placeholder.png'
            }
        },
        /*end computed*/
        async created() {
            await this.$store.dispatch('fetchUsers');
        },
        beforeMount() {
            /*set column deft to ag grid*/
            this.columnDefs = [
                {headerName: 'Name', field: 'name'},
                {headerName: 'ID', field: 'id', checkboxSelection: true, headerCheckboxSelection: true},
                {headerName: 'Email', field: 'email'},
                {headerName: 'Password', field: 'password'},
                {headerName: 'Date', field: 'created_at'},
                {headerName: 'Verify At', field: 'email_verified_at'},
                {headerName: 'Date Update', field: 'updated_at'},
            ];
        },
        mounted() {
            /*create grid option*/
            this.gridApi = this.gridOptions.api;
            this.columnApi = this.gridOptions.columnApi;
        },
        updated() {
            let self = this;
            if (!self.popupActive) {
                self.resetField();
                self.isEdit = false;
            }
            if (self.selectedRows.length !== 1) {
                self.editableAble = true
            }
            if (self.selectedRows.length <= 0) {
                self.deleteAble = true
            }
        },
        /*method*/
        methods: {
            /*set thumbnail*/
            setThumb(thumb) {
                this.user.profile = thumb
            },
            /*get row selection*/
            onSelectionChanged() {
                let self = this;
                var selectedRows = this.gridApi.getSelectedRows();
                self.selectedRows = [];
                selectedRows.forEach(function (selectedRow, index) {
                    self.selectedRows.push(selectedRow.id);
                });
                self.deleteAble = self.selectedRows.length <= 0;
                self.editableAble = self.selectedRows.length !== 1;
            },
            updateSearchQuery(val) {
                this.gridApi.setQuickFilter(val);
            },
            async refreshCard(card) {
                card.removeRefreshAnimation(300);
                /*clear search*/
                this.updateSearchQuery(this.searchQuery = '');
                /*clear filter*/
                this.gridApi.setFilterModel(null);
                await this.$store.dispatch('fetchUsers')
            },
            /*upload file*/
            uploadFile(data) {
                this.user.profile = data.target.response;
            },
            /*reset field*/
            resetField() {
                this.user.profile = null;
                this.user.gender = 'ប្រុស';
                this.user.role = 'user';
                this.user.type = 'employee';
                this.user.name = '';
                this.user.email = '';
                this.user.telephone = '';
                this.user.password = '';
            },
            /*form submit*/
            async submitForm() {
                let self = this;
                this.$validator.validateAll().then(result => {
                    if (result && this.user.profile) {
                        self.$vs.loading();
                        self.$store.dispatch('storeUser', this.user).then(function (data) {
                            if (data) {
                                self.$vs.notify({
                                    time: 4000,
                                    title: 'ប្រតិបត្តិការជោគជ័យ',
                                    text: 'ទិន្នន័យបានបន្ថែម',
                                    color: 'success',
                                    iconPack: 'feather',
                                    icon: 'icon-check',
                                    position: 'top-center'
                                });
                                self.resetField();
                            } else {
                                self.$vs.notify({
                                    title: 'ប្រតិបត្តិការបរាជ័យ',
                                    text: 'ទិន្នន័យមិនបានបន្ថែម',
                                    color: 'danger',
                                    iconPack: 'feather',
                                    icon: 'icon-message-square',
                                    position: 'top-center'
                                })
                            }
                            self.$vs.loading.close();
                        });
                    }
                })
            },
            /*remove*/
            removeUser() {
                let self = this;
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `តើអ្នកពិតជាចង់លុបមែនទេ?`,
                    text: 'ចុចពាក្យ Accept ដើម្បីលុប!',
                    accept: self.acceptAlert
                });
            },
            async acceptAlert() {
                let self = this;
                const promises = self.selectedRows.map(async (id) => {
                    await self.$store.dispatch('removeUser', id);
                });
                self.$vs.loading();
                await Promise.all(promises).then(function () {
                    self.$vs.notify({
                        color: 'success',
                        title: 'រួចរាល់',
                        text: 'បានលុបរួចរាល់',
                        iconPack: 'feather',
                        icon: 'icon-check',
                        position: 'top-center'
                    });
                    self.$vs.loading.close();
                })
            },
            editUser() {
                let self = this;
                let id = self.selectedRows[0];
                self.$store.dispatch('editUser', id).then(function (data) {
                    if (data) {
                        self.user.profile = data.profile;
                        self.user.gender = data.gender;
                        self.user.role = data.role;
                        self.user.type = data.type;
                        self.user.name = data.name;
                        self.user.email = data.email;
                        self.user.telephone = data.telephone;
                        self.user.password = '';
                        self.popupActive = true;
                        self.isEdit = true;
                    }
                })
            },
            /*form submit*/
            async updateUser() {
                let self = this;
                this.$validator.validateAll().then(result => {
                    if (result && this.user.profile) {
                        self.$vs.loading();
                        self.$store.dispatch('updateUser', {
                            data: this.user,
                            id: self.selectedRows[0]
                        }).then(function (data) {
                            if (data) {
                                self.$vs.notify({
                                    time: 4000,
                                    title: 'ប្រតិបត្តិការជោគជ័យ',
                                    text: 'ទិន្នន័យបានបន្ថែម',
                                    color: 'success',
                                    iconPack: 'feather',
                                    icon: 'icon-check',
                                    position: 'top-center'
                                });
                            } else {
                                self.$vs.notify({
                                    title: 'ប្រតិបត្តិការបរាជ័យ',
                                    text: 'ទិន្នន័យមិនបានបន្ថែម',
                                    color: 'danger',
                                    iconPack: 'feather',
                                    icon: 'icon-message-square',
                                    position: 'top-center'
                                })
                            }
                            self.$vs.loading.close();
                            self.popupActive = false;
                            self.selectedRows = [];
                            self.popupActive = false
                        });
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    @import '@sass/vuexy/extraComponents/agGridStyleOverride.scss'
</style>