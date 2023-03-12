import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image"
import picTrulli from "../../pictures/pic_trulli.jpg"
import styling from "../../styles/Post.module.css"
import Link from "next/link"
import { useEffect, useState } from "react";
import { stat } from "fs";

export const getStaticPaths: GetStaticPaths = async() => {

    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()

    const paths = data.map((post: any) => {
        return {
            params: {
                id: post.id.toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async(context: any) => {
    const { params }: any = context!
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const data = await res.json()

    const commentRes = await fetch(`https://jsonplaceholder.typicode.com/comments/${params.id}`)
    const commentData = await commentRes.json()

    return {
        props: {
            data,
            commentData
        }
    }
}

export default function Post({ data, commentData }: any) {

    const [status, setStatus] = useState(0)

    useEffect(() => {        
        const btnLike: any = document.getElementById("btnLike")
        const btnDislike: any = document.getElementById("btnDislike")

        if (status == 1) {
            btnLike.style.backgroundColor = "rgb(77, 89, 249)";
            btnDislike.style.backgroundColor = "#070B0B";
        } else if (status == 2) {
            btnLike.style.backgroundColor = "#070B0B";
            btnDislike.style.backgroundColor = "rgb(77, 89, 249)";
        }
    }, [status])

    return (
        <div>
            <div>
                <Link href={"/posts/"} className={styling.goBack}>
                    <i className="ion-md-return-left"></i>
                </Link>
            </div>
            <div className={styling.contentDiv}>
                <figure className={styling.imageContent}>
                    <Image src={picTrulli} sizes="max-width: 5em max-height: 5em" alt="Image of Trulli" className={styling.imageAdjustment} />
                    <figcaption>Image of Trulli</figcaption>
                </figure>
                <h1 className={styling.title}>{data.title}</h1>
                <p className={styling.mainContent}>{data.body}</p>
                <div className={styling.buttonsDiv}>
                    <button onClick={() => setStatus(1)} id="btnLike" className={styling.button1}><i className="icon ion-md-heart"></i></button>
                    <button onClick={() => setStatus(2)} id="btnDislike" className={styling.button2}><i className="icon ion-md-heart-dislike"></i></button>
                </div>
                <div className={styling.inputDiv}>
                    <form action="/api/comments" method="POST">
                        <div>
                            <input name="username" id="username" type="text" placeholder="Enter a username..." className={styling.usernameForm}/>
                            <div className={styling.commentForm}>
                                <textarea name="commentArea" id="commentArea" cols={80} rows={3} className={styling.commentArea} placeholder="Add a new comment..."></textarea>
                                <input type="submit" value={"Send"} className={styling.submitComment}/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={styling.commentDiv}>
                    <small className={styling.commentSmall}>{commentData.email}</small>
                    <p className={styling.commentBody}>{commentData.body}</p>
                </div>
            </div>
        </div>
    )
}