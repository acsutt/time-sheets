<template>
    <v-app>
        <!-- Simple table to contain the user info -->
        <v-data-table
            dark
            :headers="headers"
            :items="Users"
            item-key="name"
            hide-default-footer
            calculate-widths
        >
            <!-- Template contains the buttons to allow editing and deleting from this table view -->
            <template v-slot:item.controls="user">
                <router-link :to="{name: 'edit-user', params: { id: user.item._id }}">
                    <v-btn color="primary">
                        <v-icon color="white">mdi-pencil</v-icon>
                    </v-btn>
                </router-link>
                <v-btn
                    @click.prevent="deleteUser(user.item._id)"
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
                Users: [],
                //Headers to be used by table with associated value
                headers: [
                    { text: 'Username', value: 'username' },
                    { text: 'Name', value: 'name' },
                    { text: 'Email', value: 'email', divider: true },
                    { text: '', value: 'controls' },
                ],
            };
        },
        created() {
            //Pulls back current user's record to populate table
            let apiURL = 'http://localhost:4000/user-api/get-user/';
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

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>
<style lang="scss">
    tbody {
        tr:hover {
            background-color: transparent !important;
        }
    }
</style>