import { redirect } from "next/navigation";
export default async function WorkPage({searchParams}: {searchParams: Promise<{project?: string}>}) {
 const {project} = await searchParams;
 redirect(project ? `/?project=${encodeURIComponent(project)}#work` : "/#work");
}
