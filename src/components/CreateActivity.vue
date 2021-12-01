<template>
    <div id="app">
        <h3 class="text-center">Log Time</h3>
        <LogActivity
            :activity="activity"
            @update-activity="handleSubmitForm"
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
                activity: {
                    name: '',
                    description: '',
                    startTime: '',
                    endTime: '',
                    date: '',
                    color: '#17C359',
                },
                submitted: false,
            };
        },
        methods: {
            //Posts new activity to DB and resets the activity to default values
            handleSubmitForm() {
                let apiURL = 'http://localhost:4000/activity-api/create-activity';
                axios
                    .post(apiURL, this.activity)
                    .then(() => {
                        this.$router.push('/calendar');
                        this.activity = {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            date: '',
                            color: '',
                        };
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
    };
</script>


<style>
    .required:after {
        content: ' *';
        color: red;
    }
</style>