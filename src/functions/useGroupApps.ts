import { adFormat } from "@/enums/format.enum";

export default function groupByAppAndCountry(data: any)
{
    const result = [];
    const map = new Map();

    for (const entry of data)
    {
        const app = entry.app;
        const os = entry.platform;
        const country = entry.country;
        const format = entry.format;
        const revenue = parseInt(entry.revenue);
    
        if (!map.has(`${app} ${os}`))
        {
            map.set(`${app} ${os}`,
            {   data: entry,
                [`totalRevenues${country}`]: revenue,
                [`totalRevenues`]: 0,
                [`views`]: 0,
                [`conversions`]: 0,
                [`platform`]: 0,
                [`rewarded`]: 0,
                [`fullscreen`]: 0,
                [`video`]: 0,
                [`banner`]: 0,
            });
        } else
        {
            const appData = map.get(`${app} ${os}`);
            appData.data = entry;
            appData[`totalRevenues${country}`] = (appData[`totalRevenues${country}`] || 0) + revenue;
            appData[`totalRevenues`] = (appData[`totalRevenues`] || 0) + revenue;
            appData[`totalViews`] = (appData[`totalViews`] || 0) + entry.views
            appData[`totalConversions`] = (appData[`totalConversions`] || 0) + entry.conversions
            appData[`platform`] = os == "Android" ? "android" : "ios";
            appData[`rewarded`] = (appData[`rewarded`] || 0) + (format == adFormat.REWARDED ? revenue : 0);
            appData[`video`] = (appData[`video`] || 0) + (format == adFormat.VIDEO ? revenue : 0);
            appData[`banner`] = (appData[`banner`] || 0) + (format == adFormat.BANNER ? revenue : 0);
            appData[`fullscreen`] = (appData[`fullscreen`] || 0) + (format == adFormat.FULLSCREEN ? revenue : 0);
        }
    }

    for (const [key, value] of map)
    {
        result.push({
            app: key,
            ...value,
        });
    }
    return result;
}