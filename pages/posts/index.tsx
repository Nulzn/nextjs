import { GetStaticProps } from 'next'
import styling from '../../styles/Home.module.css'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async() => {

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await res.json()
	
  return {
    props: {
      data
    }
  }
}

export default function Home({ data } : any) {
  return (
    <div className={styling.mainDiv}>
      {data.map((post: any) => (
        <Link href={`/posts/${post.id}`} className={styling.link}>
          <div className={styling.secondDiv}>
            <small>{post.id}</small>
            {(post.title.Length < 30) ? <h1 className={styling.h1}>{post.title}</h1> : <h1 className={styling.h1}>{`${post.title.substring(0,30)}...`}</h1>}
            {(post.body.Length < 70) ? <p className={styling.h1}>{post.body}</p> : <p className={styling.h1}>{`${post.body.substring(0,70)}...`}</p>}
          </div>
        </Link>
      ))}
    </div>
  )
}
