import { client } from "@/libs/microcms";
import Link from "next/link";
type Props = {
    id: string;
    title: string;
};
async function getBlogPosts(): Promise<Props[]> {
    try{
        const data = await client.get({
            endpoint: "blogs",
            queries: {
                fields: "id,title",
                limit: 5,
            },
        });
        console.log("HI");
        return data.contents;
    }catch(error: any)
    {
        console.log("Error fetching",error.message, error);
        return [];
    }
}
export default async function Home() {
    const posts = await getBlogPosts();
    return (
        <div>
            <ul>
                {
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <Link href={`/blogs/${post.id}`}>
                                    {post.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
