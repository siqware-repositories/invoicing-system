<template>
    <form class="pl-2">
        <div class="vx-row mb-2">
            <div class="vx-col sm:w-1/3 w-full">
                <vs-input class="w-full" v-validate="'required'" name="owner" icon-pack="feather"
                          icon="icon-user" icon-no-border label-placeholder="ឈ្មោះម្ចាស់" v-model="company.owner"/>
                <span class="text-danger text-sm"
                      v-show="errors.has('owner')">{{ errors.first('owner') }}</span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
                <vs-input class="w-full" v-validate="'required'" name="company" icon-pack="feather"
                          icon="icon-arrow-right" icon-no-border label-placeholder="ឈ្មោះក្រុមហ៊ុន"
                          v-model="company.company"/>
                <span class="text-danger text-sm"
                      v-show="errors.has('company')">{{ errors.first('company') }}</span>
            </div>
            <div class="vx-col sm:w-1/3 w-full">
                <vs-input class="w-full" v-validate="'required'" name="tel" icon-pack="feather"
                          icon="icon-phone" icon-no-border label-placeholder="លេខទូរស័ព្ទ" v-model="company.tel"/>
                <span class="text-danger text-sm"
                      v-show="errors.has('tel')">{{ errors.first('tel') }}</span>
            </div>
        </div>
        <div class="vx-row mb-2">
            <div class="vx-col sm:w-1/3 w-full">
                <div class="vx-row">
                    <div class="vx-col w-full mb-2">
                        <vs-input type="email" class="w-full" v-validate="'required|email'" name="email"
                                  icon-pack="feather"
                                  icon="icon-mail" icon-no-border label-placeholder="អ៊ីម៉ែល" v-model="company.email"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </div>
                    <div class="vx-col w-full">
                        <vs-textarea v-model="company.address" name="address" label="អាស័យដ្ឋានក្រុមហ៊ុន" height="100"/>
                        <span class="text-danger text-sm"
                              v-show="errors.has('address')">{{ errors.first('address') }}</span>
                    </div>
                </div>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <div class="centerx">
                    <image-upload
                            :upload-url="'file.upload'"
                            @get-image-path="setThumb"
                            :image-src="company.logo?company.logo:placeholder"
                            class="mb-2"/>
                </div>
            </div>
        </div>
        <vs-divider/>
        <div class="vx-row">
            <div class="vx-col w-full">
                <vs-button @click.prevent="updateCompany" class="mr-3 mb-2">
                    កែប្រែ
                </vs-button>
            </div>
        </div>
    </form>
</template>

<script>
    import ImageUpload from "../../components/ImageUpload.vue";

    export default {
        components: {
            ImageUpload
        },
        name: "Company",
        data() {
            return {
                company: {
                    id: null,
                    owner: '',
                    company: '',
                    tel: '',
                    email: '',
                    address: '',
                    logo: '',
                }
            }
        },
        computed: {
            placeholder() {
                return this.$store.getters.getAppUrl + 'images/placeholder/placeholder.png'
            }
        },
        methods: {
            /*set thumbnail*/
            setThumb(thumb) {
                this.company.logo = thumb
            },
            updateCompany(){
                let self = this;
                this.$validator.validateAll().then(result => {
                    if (result && this.company.logo) {
                        self.$vs.loading();
                        this.$store.dispatch('updateCompany',self.company).then(function (data) {
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
                            self.editCompany()
                        });
                    }
                });
            },
            editCompany(){
                let self = this;
                this.$store.dispatch('editCompany',1).then(function (data) {
                    self.company = data
                })
            }
        },
        mounted() {
            this.editCompany()
        }
    }
</script>

<style scoped>

</style>