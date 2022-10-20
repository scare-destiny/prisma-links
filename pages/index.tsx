
import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'
import { AwesomeLink } from '../components/AwesomeLink';
import Link from 'next/link';


const AllLinksQuery = gql`
  query {
    links {
      id
      title
      url
      description
      imageUrl
      category
    }
  }
`

export default function Home() {
  const { data, loading, error } = useQuery(AllLinksQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.links.map(link => (
            <Link href={`/link/${link.id}`} key={link.id}>
            <a>
              <AwesomeLink
                title={link.title}
                category={link.category}
                url={link.url}
                id={link.id}
                description={link.description}
                imageUrl={link.imageUrl}
              />
            </a>
          </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}