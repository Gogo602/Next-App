import type { NextPage } from 'next';

interface Props {
  params: {
    id: string;
  };
}

const UserProfile: NextPage<Props> = ({ params }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1>Profile</h1>
        <hr />
        <p className='text-2xl'>Profile Page {params.id}</p>
      </div>
    </div>
  );
};

export default UserProfile;