<template>
    <div id="app">
        <h3 class="text-center">Edit</h3>
        <UserForm
            :user="user"
            :crudType="'edit'"
            @update-user="handleUpdateForm(user._id)"
            @delete-user="deleteUser(user._id)"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import UserForm from '@/components/UserForm.vue';

    export default {
        components: {
            UserForm,
        },
        data() {
            return {
                Users: [],
                user: {},
                submitted: false,
            };
        },
        created() {
            //Pulls back user's info
            let apiURL = `http://localhost:4000/user-api/get-user/`;

            axios.get(apiURL).then(res => {
                this.user = res.data[0];
                this.user.password = ''; //Blanks out the password as it is hashed so can not be displayed
            });
        },
        methods: {
            //Updates the user's info
            handleUpdateForm(id) {
                let apiURL = `http://localhost:4000/user-api/update-user/${id}`;

                axios
                    .put(apiURL, this.user)
                    .then(() => {
                        this.$router.push('/calendar'); //Returns to calendar
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            //Deletes the user and all data in the database associated with their ID
            deleteUser(id) {
                let userApiURL = `http://localhost:4000/user-api/delete-user/${id}`;
                let activityApiURL =
                    'http://localhost:4000/activity-api/delete-all/';

                if (window.confirm('Do you really want to delete?')) {
                    axios
                        .delete(activityApiURL)
                        .then(() => {
                            axios
                                .delete(userApiURL)
                                .then(() => {
                                    localStorage.clear();
                                    this.$router.push('/');
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
        },
    };
</script>