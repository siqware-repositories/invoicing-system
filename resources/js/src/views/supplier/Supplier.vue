<template>
    <!-- SIMPLE CARD WITH TABS -->
    <div class="vx-col w-full md:w-1/1 mb-base">
        <vx-card collapse-action refresh-content-action @refresh="">
            <div class="vx-row ml-2 mb-2">
                <div class="vx-col lg:w-1/2 md:w-full">
                    <div class="btn-group mb-2">
                        <vs-button @click="is_popup=true" color="success">បន្ថែម</vs-button>
                        <vs-button @click="is_popup_edit=true" color="warning">កែប្រែ</vs-button>
                        <vs-button color="danger">លុប</vs-button>
                    </div>
                </div>
            </div>
            <div class="vx-row ml-2 mb-2">
                <div class="vx-col w-full">
                    <vs-table multiple v-model="selected" pagination max-items="10" search stripe :data="users">
                        <template slot="thead">
                            <vs-th sort-key="email">Email</vs-th>
                            <vs-th sort-key="username">Name</vs-th>
                            <vs-th sort-key="website">Website</vs-th>
                            <vs-th sort-key="id">Nro</vs-th>
                        </template>
                        <template slot-scope="{data}">
                            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                                <vs-td :data="data[indextr].email">
                                    {{ data[indextr].email }}
                                </vs-td>

                                <vs-td :data="data[indextr].username">
                                    {{ data[indextr].username }}
                                </vs-td>

                                <vs-td :data="data[indextr].id">
                                    {{ data[indextr].website }}
                                </vs-td>

                                <vs-td :data="data[indextr].id">
                                    {{ data[indextr].id }}
                                </vs-td>

                            </vs-tr>
                        </template>
                    </vs-table>
                </div>
            </div>
        </vx-card>
        <add-supplier :is_popup="is_popup" @update-is_popup="syncPopup"></add-supplier>
        <edit-supplier :is_popup="is_popup_edit" @update-is_popup="syncPopupEdit"></edit-supplier>
    </div>
</template>
<script>
    import AddSupplier from "./addSupplier";
    import EditSupplier from "./editSupplier";
    export default {
        name: "Supplier",
        components: {EditSupplier, AddSupplier},
        data() {
            return {
                is_popup:false,
                is_popup_edit:false,
                selected: [],
                'tableList': [
                    'vs-th: Component',
                    'vs-tr: Component',
                    'vs-td: Component',
                    'thread: Slot',
                    'tbody: Slot',
                    'header: Slot'
                ],
                users: [
                    {
                        "id": 1,
                        "name": "Leanne Graham",
                        "username": "Bret",
                        "email": "Sincere@april.biz",
                        "website": "hildegard.org",
                    },
                    {
                        "id": 2,
                        "name": "Ervin Howell",
                        "username": "Antonette",
                        "email": "Shanna@melissa.tv",
                        "website": "anastasia.net",
                    },
                    {
                        "id": 3,
                        "name": "Clementine Bauch",
                        "username": "Samantha",
                        "email": "Nathan@yesenia.net",
                        "website": "ramiro.info",
                    },
                    {
                        "id": 4,
                        "name": "Patricia Lebsack",
                        "username": "Karianne",
                        "email": "Julianne.OConner@kory.org",
                        "website": "kale.biz",
                    },
                    {
                        "id": 5,
                        "name": "Chelsey Dietrich",
                        "username": "Kamren",
                        "email": "Lucio_Hettinger@annie.ca",
                        "website": "demarco.info",
                    },
                    {
                        "id": 6,
                        "name": "Mrs. Dennis Schulist",
                        "username": "Leopoldo_Corkery",
                        "email": "Karley_Dach@jasper.info",
                        "website": "ola.org",
                    },
                    {
                        "id": 7,
                        "name": "Kurtis Weissnat",
                        "username": "Elwyn.Skiles",
                        "email": "Telly.Hoeger@billy.biz",
                        "website": "elvis.io",
                    },
                    {
                        "id": 8,
                        "name": "Nicholas Runolfsdottir V",
                        "username": "Maxime_Nienow",
                        "email": "Sherwood@rosamond.me",
                        "website": "jacynthe.com",
                    },
                    {
                        "id": 9,
                        "name": "Glenna Reichert",
                        "username": "Delphine",
                        "email": "Chaim_McDermott@dana.io",
                        "website": "conrad.com",
                    },
                    {
                        "id": 10,
                        "name": "Clementina DuBuque",
                        "username": "Moriah.Stanton",
                        "email": "Rey.Padberg@karina.biz",
                        "website": "ambrose.net",
                    },
                ]
            }
        },
        methods:{
            syncPopup(val){
                this.is_popup = val
            },
            syncPopupEdit(val){
                this.is_popup_edit = val
            }
        }
    }
</script>

<style scoped>

</style>