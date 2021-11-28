<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Log Time</h3>
            <LogActivity
                :activity="activity"
                @update-activity="handleSubmitForm"
            />
        </div>
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
                activity: {
                    name: '',
                    description: '',
                    duration: '',
                    startTime: '',
                    date: '',
                    color: '#000000',
                },
                submitted: false,
            };
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:4000/activity-api/create-activity';

                axios
                    .post(apiURL, this.activity)
                    .then(() => {
                        this.$router.push('/calendar');
                        this.activity = {
                            name: '',
                            description: '',
                            duration: '',
                            startTime: '',
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