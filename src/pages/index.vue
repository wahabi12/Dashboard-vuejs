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
							item-value="app"
							v-model:expanded="expanded"
							show-expand>
							<template v-slot:header.app="{ column }">
								{{ column.title?.toUpperCase() }}
							</template>

							<template v-slot:expanded-row="{ columns, item}">
								<tr>
									<td :colspan="columns.length">
										<div style="padding: 15px;">
											the country that generated the most revenue for 
											{{ item.app }} is {{ useGetBestCountry(item) }}
											<br/>
											<v-row>
												<v-col>
												Total ads views: <b>{{ item.totalViews }}</b> <br/>
												Total conversions: <b>{{ item.totalConversions }}</b> <br/>
												Conversion %:
												<b>
													{{ ((item.totalConversions * 100) /
												item.totalViews).toFixed(2) }} %
												</b>
												<br/>
												Total revenues
												<b>{{ useFormatRevenues(item.totalrevenues) }}</b>
												</v-col>
												<v-col>
													Total banner revenues:
													<b>{{ useFormatRevenues(item.banner) }}</b>
													<br/>
													Total full-screen revenues:
													<b>{{ useFormatRevenues(item.fullscreen) }}</b>
													<br/>
													Total video revenues:
													<b>{{ useFormatRevenues(item.video) }}</b>
													<br/>
													Total rewarded revenues:
													<b>{{ useFormatRevenues(item.rewarded) }}</b>
													<br/>
												</v-col>
											</v-row>
										</div>
									</td>
								</tr>
							</template>
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
import useFormatRevenues from "../functions/useFormatRevenues";
import useGetBestRevenues from "@/functions/useGetBestCountry";

let selectedTab = ref(0); 
const links = ref(["Dashbaord", "About"]);
let apiResult = ref();
let groupData = ref<any[]>([]);
let expanded = ref([]);


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
