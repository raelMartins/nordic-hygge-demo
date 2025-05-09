import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-5_wkcvc0s0bX1iyez3mBC0g7X0Gzef8&libraries=places`}
          async
          defer
        ></script>
        <link
          href='https://fonts.cdnfonts.com/css/euclid-circular-b'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
