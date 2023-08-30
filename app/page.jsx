import styles from './page.module.css'
import getCurrentUser from './actions/getCurrentUser'
import getPosts from './actions/getPost'
import SinglePost from '@/components/singlePost/SinglePost'
import Image from 'next/image'
import blog from "../public/blog-bg.webp"

export default async function Home() {
  const currentUser = await getCurrentUser()
  const posts = await getPosts()

  return (
    <main>
      {
        currentUser ? (
          <SinglePost posts={posts} />
        ) : (
          <div className={styles.container}>
            <Image src={blog} className={styles.img} />
            <div className={styles.content}>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore fugit qui quis. Ab a dolorem, voluptates nisi, consequuntur id animi assumenda cum cupiditate corporis accusamus exercitationem, dignissimos incidunt rem mollitia! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores accusantium quos similique ipsam, ducimus deleniti cupiditate libero quaerat sequi vitae cumque ratione itaque, officia, sunt perspiciatis nulla laborum nobis aut!</p>
            </div>
          </div>
        )
      }
    </main>
  )
}
