import getLocalData from "@/lib/getLocalData";
import { getLocale } from "next-intl/server";
import Info from "./info";

export default async function AboutView() {
    const locale = await getLocale();
    const personal = await getLocalData("personal", locale)
    const contacts = await getLocalData("contacts")

    return (
        <div className='min-h-full md:h-[calc(100vh-80px)] flex flex-col justify-start md:justify-center pt-4 md:pt-2 pb-8 md:pb-4'>
            <Info data={personal} contacts={contacts} locale={locale} />
        </div>
    )
}