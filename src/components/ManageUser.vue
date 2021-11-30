<template>
    <v-app>
        <v-data-table
            dark
            :headers="headers"
            :items="Users"
            item-key="name"
            hide-default-footer
            calculate-widths
        >
            <template v-slot:item.controls="user">
                <router-link :to="{name: 'edit-user', params: { id: user.item._id }}">
                    <v-btn color="primary">
                        <v-icon color="white">mdi-pencil</v-icon>
                    </v-btn>
                </router-link>
                <v-btn
                    @click.prevent="deleteActivity(user.item._id)"
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
                headers: [
                    { text: 'Username', value: 'username' },
                    { text: 'Name', value: 'name' },
                    { text: 'Email', value: 'email', divider: true },
                    { text: '', value: 'controls' },
                ],
            };
        },
        created() {
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
<style lang="scss">
    tbody {
        tr:hover {
            background-color: transparent !important;
        }
    }
</style>