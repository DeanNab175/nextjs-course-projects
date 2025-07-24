import { Button } from "@heroui/button";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h1>Discuss app.</h1>
      <form action={actions.signIn}>
        <Button type="submit">Sign in</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign out</Button>
      </form>

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>Sign out</div>
      )}

      <Profile />
    </>
  );
}
