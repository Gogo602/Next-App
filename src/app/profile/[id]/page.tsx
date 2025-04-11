'use client';

import type { NextPage } from 'next';
import { useParams } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const UserProfile: NextPage<Props> = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

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