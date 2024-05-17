import Link from 'next/link';
import { makeServer } from "./mocks/server";


export default function Home() {
  if (typeof window !== 'undefined') {
    makeServer(); // Only call makeServer on the client side
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
  }}>
       <Link href="/editor/1">
         <button style={{fontSize: 120, fontWeight: 100}}>+</button>
       </Link>
  </div>
  );
}
