<template>
    <form class="ml-2">
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
            <div class="vx-col w-full">
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
                <vs-button @click.prevent="" type="relief" class="mr-3 mb-2">
                    កែប្រែ
                </vs-button>
            </div>
        </div>
    </form>
</template>

<script>
    import ImageUpload from "../../components/ImageUpload";
    export default {
        name: "Profile",
        components: {ImageUpload},
        data(){
            return{
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
            }
        },
        computed: {
            placeholder() {
                return this.$store.getters.getAppUrl + 'images/placeholder/placeholder.png'
            }
        },
        methods:{
            /*set thumbnail*/
            setThumb(thumb) {
                this.user.profile = thumb
            },
        }
    }
</script>

<style scoped>

</style>