import { Core } from '~/components/core';

export default function Home() {
  return (
    <div className='py-24 px-4 min-h-svh'>
      <main className='mx-auto max-w-3xl w-full flex flex-col gap-12 '>
        <h1>@rn-primitives</h1>
        <p className='font-medium'>
          Styled with{' '}
          <a className='hover:underline' href='https://www.nativewind.dev/v4/overview'>
            NativeWind
          </a>
        </p>
        <Core />
      </main>
    </div>
  );
}
