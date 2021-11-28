<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="user in Users"
                        :key="user._id"
                    >
                        <td>{{ user.username }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <router-link
                                :to="{name: 'edit-user', params: { id: user._id }}"
                                class="btn btn-success"
                            >Edit
                            </router-link>
                            <button
                                @click.prevent="deleteActivity(user._id)"
                                class="btn btn-danger"
                            >Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                Users: [],
            };
        },
        created() {
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
            deleteActivity(id) {
                let apiURL = `http://localhost:4000/user-api/delete-user/${id}`;
                let indexOfArrayItem = this.Users.findIndex(i => i._id === id);

                if (window.confirm('Do you really want to delete?')) {
                    axios
                        .delete(apiURL)
                        .then(() => {
                            this.Users.splice(indexOfArrayItem, 1);
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