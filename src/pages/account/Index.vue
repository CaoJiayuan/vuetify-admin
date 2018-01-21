<template>
    <v-container>
       <v-card>
           <v-card-media>
               <v-container fill-height fluid>
                   <v-layout fill-height>
                       <v-flex xs12 align-end flexbox>
                           <span class="headline">Users</span>
                       </v-flex>
                   </v-layout>
               </v-container>
           </v-card-media>
           <v-card-title>
               <v-data-table :headers="headers"></v-data-table>
           </v-card-title>
       </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Sodium (mg)', value: 'sodium' },
                    { text: 'Calcium (%)', value: 'calcium' },
                    { text: 'Iron (%)', value: 'iron' }
                ]
            }
        },
        components: {},
        methods   : {},
        mounted() {

        },
        created() {

        },

    }
</script>
