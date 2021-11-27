<template>
    <div id="app">
        <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
            <div class="container">
                <a class="navbar-brand pl-5 pr-2">Time Sheets</a>
                <ul class="nav navbar-nav flex-row mr-auto">
                    <li class="nav-item">
                        <router-link
                            class="nav-link pr-4"
                            to="/log-activity"
                        >Log Activity</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link pr-4"
                            to="/calendar"
                        >Calendar</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link pr-4"
                            to="/view"
                        >View</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav flex-row ml-auto">
                    <li class="nav-item pa-2">
                        <v-btn
                            class="nav-link"
                            @click="logOut"
                        >Logout</v-btn>
                    </li>
                </ul>
            </div>
        </nav>

        <v-app-bar
            color="deep-purple accent-4"
            dense
            dark
        >

            <v-toolbar-title>Time Sheets</v-toolbar-title>

            <v-spacer></v-spacer>
            <router-link
                class="nav-link pr-4"
                to="/log-activity"
            >
                <v-btn
                    class="ma-2"
                    color="primary"
                    dark
                >
                    Log Time
                    <v-icon right>mdi-clock-plus-outline</v-icon>
                </v-btn>
            </router-link>
            <router-link
                class="nav-link pr-4"
                to="/calendar"
            >
                <v-btn
                    class="ma-2"
                    color="primary"
                    dark
                >
                    Calendar
                    <v-icon right>mdi-calendar-month-outline</v-icon>
                </v-btn>
            </router-link>

            <v-menu
                left
                bottom
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-account-outline</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="n in 5"
                        :key="n"
                        @click="() => {}"
                    >
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <div class="mt-5">
            <router-view fluid></router-view>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                signedIn: false,
            };
        },
        name: 'App',

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
            logOut() {
                this.signedIn = false;
                localStorage.clear();
                this.$router.push('/');
            },
        },
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>