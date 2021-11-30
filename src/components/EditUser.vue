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
                oldPasswordHash: '',
                submitted: false,
            };
        },
        created() {
            let apiURL = `http://localhost:4000/user-api/get-user/`;

            axios.get(apiURL).then(res => {
                this.user = res.data[0];
                this.user.password = '';
            });
        },
        methods: {
            handleUpdateForm(id) {
                console.log(id);
                let apiURL = `http://localhost:4000/user-api/update-user/${id}`;

                axios
                    .put(apiURL, this.user)
                    .then(() => {
                        this.$router.push('/calendar');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            deleteUser(id) {
                let apiURL = `http://localhost:4000/user-api/delete-user/${id}`;

                if (window.confirm('Do you really want to delete?')) {
                    axios
                        .delete(apiURL)
                        .then(() => {
                            this.$router.push('/');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
        },
    };
</script>