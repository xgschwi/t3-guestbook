import { signIn, signOut, useSession } from "next-auth/react";
import { api } from '../utils/api'

const GuestbookEntries = () => {
  const {data: guestbookEntries, isLoading } = api.guestbook.getAll.useQuery();

  if (isLoading) return <div>Fetching messages...</div>

  return (
    <div className='flex flex-col gap-4'>
      {guestbookEntries?.map((entry, idx) => {
        return (
          <div key={idx}>
            <p>{entry.message}</p>
            <span>- {entry.name}</span>
          </div>
        )
      })}
    </div>
  )
}

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <main className='flex flex-col items-center pt-4'>Loading...</main>
  }

  return (
    <main className='flex flex-col items-center'>
      <h1 className='text-3xl pt-4'>Guestbook</h1>
      <div className='pt-10'>
        {session ? (
          <>
            <p className='mb-4 text-center'>Hello {session.user?.name}</p>
            <button className='mx-auto block rounded-md bg-neutral-800 py-3 px-6 text-center hover:bg-neutral-700' 
              onClick={() => {
                signOut().catch(console.log);
              }}>
              Logout
            </button>
          </>
        ): (
          <button className='mx-auto block rounded-md bg-neutral-800 py-3 px-6 text-center hover:bg-neutral-700'
            onClick={() => {
              signIn('discord').catch(console.log)
            }}>
            Login With Discord
          </button>
        )}
        <div className='pt-10'>
          <GuestbookEntries/>
        </div>
      </div>
    </main>
  );
};

export default Home;