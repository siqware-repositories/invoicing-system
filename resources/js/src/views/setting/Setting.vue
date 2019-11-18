<template>
    <!-- SIMPLE CARD WITH TABS -->
    <div class="vx-col w-full md:w-1/1 mb-base">
        <vx-card collapse-action refresh-content-action @refresh="">
            <div class="flex flex-wrap">
                <vs-tabs position="left">
                    <vs-tab label="ក្រុមហ៊ុន">
                        <company></company>
                    </vs-tab>
                    <vs-tab label="Unit">
                        <unit></unit>
                    </vs-tab>
                    <vs-tab label="Category">
                        <category></category>
                    </vs-tab>
                    <vs-tab label="Brand">
                        <brand></brand>
                    </vs-tab>
                    <vs-tab label="ប្រូហ្វាល">
                        <profile></profile>
                    </vs-tab>
                </vs-tabs>
            </div>
        </vx-card>
    </div>
</template>

<script>
    import Company from "./Company";
    import Unit from "./Unit";
    import Category from "./Category";
    import Brand from "./Brand";
    import Profile from "./Profile";
    export default {
        name: "Setting",
        components: {Profile, Brand, Category, Unit, Company}
    }
</script>

<style scoped>

</style>