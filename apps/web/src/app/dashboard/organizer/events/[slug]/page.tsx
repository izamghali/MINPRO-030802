import Table from "@/components/Table"
import React from "react"

// export const generateStaticParams = async () => {
//     const posts = await fetchBlogs()

//     return posts.map((post: { fields: { slug: string; } }) => ({
//         params: post.fields.slug,
//     }))
// }

// export async function generateMetadata(params : { params: { slug: string } }) {
//     const slug = params.params.slug
//     const blog = await fetchBlogBySlug(slug)

//     const title = blog.fields.title
//     const author = blog.fields.author.fields.name
//     const date = blog.fields.date
//     const authorSrc = blog.fields.author.fields.image.fields.file.url
//     const src = `https://${blog.fields.img.fields.file.url}`
//     const content = blog.fields.content; 
      
//     return { 
//         title: title,
//         description: title,
//         authors: author,
//         openGraph: {
//             images: [`https:${src}`, `https:${authorSrc}`]
//         }
//     }
// }

export default async function EventDetail(params : { params: { slug: string } }) {
    return (
        <div>
            
            <Table />

        </div>
    )
};

