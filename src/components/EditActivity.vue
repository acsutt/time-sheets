<template>
    <div id="app">
        <h3 class="text-center">Edit</h3>
        <LogActivity
            :activity="activity"
            :crudType="'edit'"
            @update-activity="handleUpdateForm"
            @delete-activity="deleteActivity"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import LogActivity from '@/components/ActivityForm.vue';

    export default {
        components: {
            LogActivity,
        },
        data() {
            return {
                Activities: [],
                activity: {},
                submitted: false,
            };
        },
        //Returns the data on the record that has been selected
        created() {
            let apiURL = `http://localhost:4000/activity-api/edit-activity/${this.$route.params.id}`;

            axios.get(apiURL).then(res => {
                this.activity = res.data;
                this.activity.date = this.activity.date.split('T')[0]; //Necessary for displaying just the date without the time on the end
            });
        },
        methods: {
            //Updates the record with new data
            handleUpdateForm() {
                let apiURL = `http://localhost:4000/activity-api/update-activity/${this.$route.params.id}`;

                axios
                    .put(apiURL, this.activity)
                    .then(() => {
                        this.$router.go(-1);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            //Deletes the current record
            deleteActivity() {
                let apiURL = `http://localhost:4000/activity-api/delete-activity/${this.$route.params.id}`;
                let indexOfArrayItem = this.Activities.findIndex(
                    i => i._id === this.$route.params.id
                );
                //Confirmation window as deletion is permanent
                if (window.confirm('Do you really want to delete?')) {
                    axios
                        .delete(apiURL)
                        .then(() => {
                            this.Activities.splice(indexOfArrayItem, 1);
                            this.$router.push('/calendar');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
        },
    };
</script>