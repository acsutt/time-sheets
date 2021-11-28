<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Edit</h3>
            <UserForm
                :user="user"
                @update-user="handleUpdateForm"
            />
            <button
                @click.prevent="deleteUser(user._id)"
                class="btn btn-danger"
            >Delete</button>
        </div>
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
            let apiURL = `http://localhost:4000/user-api/edit-user/${this.$route.params.id}`;

            axios.get(apiURL).then(res => {
                this.user = res.data;
                // this.oldPasswordHash = this.user.password;
                this.user.password = '';
            });
        },
        methods: {
            handleUpdateForm() {
                let apiURL = `http://localhost:4000/user-api/update-user/${this.$route.params.id}`;

                // if (this.user.password == '') {
                //     this.user.password = this.oldPasswordHash;
                // }

                axios
                    .put(apiURL, this.user)
                    .then(() => {
                        this.$router.push('/manage-user');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            deleteUser() {
                let apiURL = `http://localhost:4000/user-api/delete-user/${this.$route.params.id}`;
                let indexOfArrayItem = this.Users.findIndex(
                    i => i._id === this.$route.params.id
                );

                if (window.confirm('Do you really want to delete?')) {
                    axios
                        .delete(apiURL)
                        .then(() => {
                            this.Users.splice(indexOfArrayItem, 1);
                            this.$router.push('/manage-user');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
        },
    };
</script>