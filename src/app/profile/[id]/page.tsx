import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const UserProfile: NextPage<Props> = () => {
  const router = useRouter();
  const { id } = router.query as { id: string }; // Access route parameters using useRouter

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1>Profile</h1>
        <hr />
        <p className='text-2xl'>Profile Page {id}</p>
      </div>
    </div>
  );
};

export default UserProfile;