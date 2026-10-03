import getLocalData from "@/lib/getLocalData";
import { ExperienceList } from "@/shared/types/experience";
import EducationsView from "@/views/main/educations";
import { getLocale } from "next-intl/server";

export default async function EducationPage() {
    const locale = await getLocale();
    const educationList: ExperienceList = await getLocalData("education", locale);

    return <EducationsView experienceList={educationList} />;
}