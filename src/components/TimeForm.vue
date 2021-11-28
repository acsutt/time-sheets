l<template>
    <div id="app">
        <v-app>
            <v-form
                ref="form"
                @submit.prevent="handleSubmitForm"
            >
                <!-- Textfield for entering activity name/title, 32 character limit -->
                <v-text-field
                    v-model="activity.name"
                    label="Name"
                    prepend-icon="mdi-text-short"
                    :error-messages="nameErrors"
                    @input="$v.activity.name.$touch()"
                    @blur="$v.activity.name.$touch()"
                ></v-text-field>
                <!-- Textarea for entering description, no charcter limit -->
                <v-textarea
                    v-model="activity.description"
                    label="Description"
                    prepend-icon="mdi-text-long"
                ></v-textarea>
                <!-- Text field for entering duration onlny allows integer -->
                <v-text-field
                    v-model="activity.duration"
                    label="Duration"
                    prepend-icon="mdi-timer-outline"
                    type="number"
                    :error-messages="durationErrors"
                    @input="$v.activity.duration.$touch()"
                    @blur="$v.activity.duration.$touch()"
                ></v-text-field>
                <!-- Menu for selecting start time -->
                <v-menu
                    ref="timeMenu"
                    v-model="timeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="activity.startTime"
                            label="Start Time"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="timeMenu"
                        v-model="activity.startTime"
                        full-width
                        @click:minute="$refs.menu.save(activity.startTime)"
                    ></v-time-picker>
                </v-menu>
                <!-- Menu for selecting date -->
                <v-menu
                    ref="dateMenu"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="activity.date"
                            chips
                            small-chips
                            label="Date"
                            prepend-icon="mdi-calendar-blank-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :error-messages="dateErrors"
                            @input="$v.activity.date.$touch()"
                            @blur="$v.activity.date.$touch()"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="activity.date"
                        no-title
                        scrollable
                        show-adjacent-months
                    >
                    </v-date-picker>
                </v-menu>
                <!-- Menu for selecting colour -->
                <v-menu
                    ref="colorMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="activity.color"
                            label="Colour"
                            prepend-icon="mdi-palette-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-color-picker
                        v-model="activity.color"
                        no-title
                        scrollable
                    >
                    </v-color-picker>
                </v-menu>

                <v-btn
                    color="success"
                    @click="handleSubmitForm"
                >Save</v-btn>
            </v-form>
        </v-app>
    </div>
</template>

<script>
    import { required, integer, maxLength } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                submitted: false,
                timeMenu: false,
            };
        },
        props: ['activity'],
        validations: {
            activity: {
                name: { required, maxLength: maxLength(32) },
                duration: { required, integer },
                date: { required },
            },
        },
        computed: {
            // Error messages for each entry that requires validation
            nameErrors() {
                const errors = [];
                if (!this.$v.activity.name.$dirty) return errors;
                !this.$v.activity.name.maxLength &&
                    errors.push('Name must be at most 32 characters long');
                !this.$v.activity.name.required && errors.push('Name is required');
                return errors;
            },
            durationErrors() {
                const errors = [];
                if (!this.$v.activity.duration.$dirty) return errors;
                !this.$v.activity.duration.integer &&
                    errors.push('Duration must be an integer');
                !this.$v.activity.duration.required &&
                    errors.push('Duration is required');
                return errors;
            },
            dateErrors() {
                const errors = [];
                if (!this.$v.activity.date.$dirty) return errors;
                !this.$v.activity.date.required && errors.push('Date is required');
                return errors;
            },
        },
        methods: {
            handleSubmitForm() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.$emit('update-activity', this.activity);
            },
        },
    };
</script>
