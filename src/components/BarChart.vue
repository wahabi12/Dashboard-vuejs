<template>
    <div id="app" style="width: 500px;">
        <BarChart v-bind="barChartProps" :options="options"/>
    </div>
</template>

<script setup lang="ts">
import { ref, computed} from "vue";
import { Chart, plugins, registerables } from "chart.js";
import { BarChart, useBarChart } from "vue-chart-3";
Chart.register(...registerables);

type ChartProps =
{
    data: number[];
};
const props = defineProps<ChartProps>();

const chartData = computed(() => ({
    labels: ["US", "UK", "FR", "JP", "AU", "CN"],
    datasets: [
        {
            data: props.data,
            backgroundColor:
            [
                "#77CEFF",
                "#0079AF",
                "#123E68",
                "#97B0C4",
                "#A5C8ED",
                "#587aa3",
            ],
        },
    ],
}));
const { barChartProps, barChartRef } = useBarChart({
    chartData: chartData.value,
});

const options = ref({
    responsive: true,
    plugins:
    {
        legend:
        {
             display: false,
        },
        title:
        {
            display: true,
            text: "Revenues (in USD) by countries",
        },
    },
});
</script>