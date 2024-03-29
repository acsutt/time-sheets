<template>
    <v-app>
        <v-sheet
            tile
            height="54"
            class="d-flex"
            dark
            border
        >
            <v-btn
                icon
                class="ma-2"
                @click="$refs.calendar.prev()"
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                class="ma-2"
                @click="changeType"
                label="Calendar View"
                outlined
            >
                {{ this.type + 'ly view'}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                icon
                class="ma-2"
                @click="$refs.calendar.next()"
            >
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-sheet>
        <v-sheet height="100%">
            <v-calendar
                dark
                color="primary"
                ref="calendar"
                v-model="value"
                :weekdays="weekday"
                :type="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-overlap-threshold="30"
                :first-time="'06:30'"
                :interval-count=24
                :interval-minutes="30"
                @change="getEvents"
                @click:event="showEvent"
                @click:more="viewWeek"
                @click:date="viewWeek"
            ></v-calendar>
            <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
                max-width="30%"
            >
                <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                >
                    <v-toolbar
                        :color="selectedEvent.color"
                        dark
                    >
                        <router-link :to="{name: 'edit-activity', params: { id: selectedEvent.id }}">
                            <v-btn color="primary">
                                <v-icon color="white">mdi-pencil</v-icon>
                            </v-btn>
                        </router-link>
                        <v-spacer></v-spacer>
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click.prevent="deleteActivity(selectedEvent.id)"
                            class="ml-3"
                            color="error"
                        >
                            <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <span v-html="selectedEvent.desc"></span>
                    </v-card-text>
                </v-card>
            </v-menu>
        </v-sheet>
    </v-app>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                //Setup of variables mainly for v-calendar
                Activities: [],
                loggedActivities: [],
                type: 'week',
                mode: 'stack',
                weekday: [1, 2, 3, 4, 5, 6, 0],
                value: '',
                events: [],
                selectedEvent: {},
                selectedElement: null,
                selectedOpen: false,
            };
        },
        created() {
            //Pulls back data to populate calendar then uses getEvents to format
            let apiURL = 'http://localhost:4000/activity-api/get-all';
            axios
                .get(apiURL)
                .then(res => {
                    this.Activities = res.data;
                    this.getEvents();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            //Used for removing activity from the database and arrays storing it, forces update of page so that it disappears from calendar
            deleteActivity(id) {
                let apiURL = `http://localhost:4000/activity-api/delete-activity/${id}`;
                let indexOfArrayItem = this.Activities.findIndex(i => i._id === id);

                if (window.confirm('Do you really want to delete?')) {
                    axios
                        .delete(apiURL)
                        .then(() => {
                            this.Activities.splice(indexOfArrayItem, 1);
                            this.events.splice(indexOfArrayItem, 1);
                            this.$router.push('/calendar');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
            //Given all of activity data for logged in user, splits it into format to be used by calendar to display properly
            getEvents() {
                const events = [];
                for (const activity of Object.entries(this.Activities)) {
                    let formatStartTime =
                        activity[1].date.split('T')[0] +
                        'T' +
                        activity[1].startTime +
                        ':00';
                    let formatEndtTime =
                        activity[1].date.split('T')[0] +
                        'T' +
                        activity[1].endTime +
                        ':00';
                    events.push({
                        id: activity[1]._id,
                        name: activity[1].name,
                        desc: activity[1].description,
                        start: formatStartTime,
                        end: formatEndtTime,
                        color: activity[1].color,
                    });
                }
                this.events = events;
            },
            //Handles activity clicking to show pop up menu with some info and edit and delete buttons
            showEvent({ nativeEvent, event }) {
                const open = () => {
                    this.selectedEvent = event;
                    this.selectedElement = nativeEvent.target;
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() => (this.selectedOpen = true))
                    );
                };

                if (this.selectedOpen) {
                    this.selectedOpen = false;
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() => open())
                    );
                } else {
                    open();
                }

                nativeEvent.stopPropagation();
            },
            //Switches to show week view
            viewWeek({ date }) {
                this.focus = date;
                this.type = 'week';
            },
            //Toggles between week view and month view
            changeType() {
                if (this.type == 'week') {
                    this.type = 'month';
                } else {
                    this.type = 'week';
                }
            },
        },
    };
</script>


