export default function Home() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.location.href = "/index.tsx";
          `,
      }}
    />
  );
}
