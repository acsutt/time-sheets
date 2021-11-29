<template>
    <div id="app">
        <h3 class="text-center">Edit</h3>
        <LogActivity
            :activity="activity"
            @update-activity="handleUpdateForm"
        />
        <button
            @click.prevent="deleteActivity(activity._id)"
            class="btn btn-danger"
        >Delete</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import LogActivity from '@/components/TimeForm.vue';

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
        created() {
            let apiURL = `http://localhost:4000/activity-api/edit-activity/${this.$route.params.id}`;

            axios.get(apiURL).then(res => {
                this.activity = res.data;
                this.activity.date = this.activity.date.split('T')[0];
            });
        },
        methods: {
            handleUpdateForm() {
                let apiURL = `http://localhost:4000/activity-api/update-activity/${this.$route.params.id}`;

                axios
                    .put(apiURL, this.activity)
                    .then(() => {
                        this.$router.push('/calendar');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            deleteActivity() {
                let apiURL = `http://localhost:4000/activity-api/delete-activity/${this.$route.params.id}`;
                let indexOfArrayItem = this.Activities.findIndex(
                    i => i._id === this.$route.params.id
                );

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