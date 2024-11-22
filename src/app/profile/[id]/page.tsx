
import ProfileClient from "./ProfileClient";

export default function ProfilePage({ params }: { params: { id: string } }) {

  return <ProfileClient id={params.id} />;
}
