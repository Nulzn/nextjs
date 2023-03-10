import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async() => {

  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

export default function Home({ data } : any) {
  return (
    <div>
      {data.map((user: any) => (
        <p>{user.username}</p>
      ))}
    </div>
  )
}
