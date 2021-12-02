<template>
    <div id="app">
        <h3 class="text-center">Register</h3>
        <CreateUser
            :user="user"
            :Users="Users"
            @update-user="handleSubmitForm"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import CreateUser from '@/components/UserForm.vue';

    export default {
        components: {
            CreateUser,
        },
        data() {
            return {
                //Creates default blank template for user
                user: {
                    name: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    admin: false,
                },
                Users: [],
                submitted: false,
            };
        },
        created() {
            //Necessary to pull back all existing users in order to prevent two identical usernames
            let apiURL = 'http://localhost:4000/user-api';
            axios
                .get(apiURL)
                .then(res => {
                    this.Users = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            handleSubmitForm() {
                //Creates new user with
                let apiURL = 'http://localhost:4000/user-api/register';

                axios
                    .post(apiURL, this.user)
                    .then(() => {
                        this.$router.push('/login');
                        this.user = {
                            name: '',
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            admin: false,
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