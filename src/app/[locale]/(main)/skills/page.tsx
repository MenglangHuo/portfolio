import getLocalData from "@/lib/getLocalData";
import { Skills as SkillsType } from "@/shared/types/skills";
import SkillsView from "@/views/main/about/skills";
import { getLocale } from "next-intl/server";

export default async function SkillsPage() {
    const locale = await getLocale();
    const skills: SkillsType[] = await getLocalData("skills", locale);

    return (
        <div className="py-8 md:py-16">
            <SkillsView data={skills} />
        </div>
    );
}
