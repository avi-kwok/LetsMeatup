import { Suspense } from "react";
import { auth, signIn, signOut } from "@/auth";

const buttonClass =
  "rounded-lg bg-neutral-900 px-5 py-2.5 font-medium text-white dark:bg-white dark:text-neutral-900";

async function AuthPanel() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p>
          Signed in as <strong>{session.user.name}</strong>
        </p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className={buttonClass}>Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button className={buttonClass}>Sign in with Google</button>
    </form>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">LetsMeatup</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Find when the whole crew can meat up.
      </p>
      <Suspense fallback={<div className="h-11" />}>
        <AuthPanel />
      </Suspense>
    </main>
  );
}
