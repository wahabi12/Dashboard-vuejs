<template>
<v-app>
	<v-app-bar class="px-3" color="purple-accent-1" flat density="compact">
		<v-spacer></v-spacer>
		<v-tabs v-model="selectedTab" bg-color="purple-accent-4" centered>
			<v-tab v-for="links in links" :key="links">
				{{ links }}
			</v-tab>
    </v-tabs>
	<v-spacer></v-spacer>
	</v-app-bar>
	<v-main>
		<v-container fluid>
			<v-row>
				<v-col cols="12" sm="2">

				</v-col>
				<v-col cols="12" sm="8">
					<v-sheet
						v-if="selectedTab == 0"
						min-height="70vh"
						rounded="lg"
						class="pa-4">
						<h2>Apps list</h2>
						<v-data-table 
							v-if="groupData" 
							:items="groupData"
							:headers="headers"
							:item-value="app"
							:v-model:expanded="expanded"
							show-expand="">

						</v-data-table>
					</v-sheet>
					
					<v-sheet
						v-else
						min-height="70vh"
						rounded="lg"
						class="pa-4 pt-5">
						page 1
					</v-sheet>
				</v-col>
				<v-col cols="12" sm="2">

				</v-col>

			</v-row>
		</v-container>
	</v-main>
</v-app>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted} from "vue";
import useGroupApps from "../functions/useGroupApps"

let selectedTab = ref(0);
const links = ref(["Dashbaord", "About"]);
let apiResult = ref();
let groupData = ref<any[]>([]);

const headers = ref([
	{ title: "App",		key: "app" },
	{ title: "US",		key: "totalrevenuesUS" },
	{ title: "UK",		key: "totalrevenuesUK" },
	{ title: "FR",		key: "totalrevenuesFR" },
	{ title: "JP",		key: "totalrevenuesJP" },
	{ title: "CN",		key: "totalrevenuesCN" },
	{ title: "AU",		key: "totalrevenuesAU" },
	{ title: "Total",	key: "totalrevenues" },
	{ title: "",		key: "data-table-expand" },
]);

onMounted(async () =>
{
	fetchMonotizationApi();
});

watch(apiResult, (newValue) =>
{
	groupData.value = useGroupApps(newValue.data);
});

//API
const fetchMonotizationApi = async () =>
{
	fetch('https://www.anthony-cardinale.fr/_placeholder/monetization-api.json')
	.then(Response => Response.json())
	.then(data => apiResult.value = data);
}
</script>
