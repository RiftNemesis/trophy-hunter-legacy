import Link from 'next/link';
import React from 'react';
import Header from '../components/header';

export default ({ url }) => (
  <main>
    <Header />
    <p>This is the home page. URL: {JSON.stringify(url)}</p>
    <Link href="/about">
      <a>About</a>
    </Link>
  </main>
);
