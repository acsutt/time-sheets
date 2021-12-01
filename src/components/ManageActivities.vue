<template>
    <v-app id="app">
        <!-- Simple table to contain all activities to allow easier viewing than on the calendar -->
        <v-data-table
            dark
            :headers="headers"
            :items="Activities"
            item-key="name"
            sort-by-text="date"
            calculate-widths
            loading-text
        >
            <!-- Template contains the buttons to allow editing and deleting items from this table view -->
            <template v-slot:item.controls="activity">
                <router-link :to="{name: 'edit-activity', params: { id: activity.item._id }}">
                    <v-btn color="primary">
                        <v-icon color="white">mdi-pencil</v-icon>
                    </v-btn>
                </router-link>
                <v-btn
                    @click.prevent="deleteActivity(activity.item._id)"
                    class="ml-3"
                    color="error"
                >
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-app>

</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                Activities: [],
                //Headers to be used by table with associated value
                headers: [
                    { text: 'Activity Name', value: 'name' },
                    { text: 'Description', value: 'description' },
                    { text: 'Date', value: 'date' },
                    { text: 'Start Time', value: 'startTime' },
                    { text: 'End Time', value: 'endTime', divider: true },
                    { text: '', value: 'controls' },
                ],
            };
        },
        created() {
            //Pulls back all Activities to populate table
            let apiURL = 'http://localhost:4000/activity-api/get-all';
            axios
                .get(apiURL)
                .then(res => {
                    this.Activities = res.data;
                    for (const activity of Object.entries(this.Activities)) {
                        activity[1].date = activity[1].date.split('T')[0];
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            //Allows activities to be deleted
            deleteActivity(id) {
                let apiURL = `http://localhost:4000/activity-api/delete-activity/${id}`;
                let indexOfArrayItem = this.Activities.findIndex(i => i._id === id);

                if (window.confirm('Do you really want to delete?')) {
                    axios
                        .delete(apiURL)
                        .then(() => {
                            this.Activities.splice(indexOfArrayItem, 1);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
        },
    };
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>