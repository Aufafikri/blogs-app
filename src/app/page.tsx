import FormNewPost from '@/components/form-new-post'
import { getCurrentUser } from '@/lib/session'

const page = async () => {
  const user = await getCurrentUser()
  console.log(user)
  return (
    <main className='max-w-4xl mx-auto my-5'>
      <FormNewPost />
    </main>
  )
}

export default page