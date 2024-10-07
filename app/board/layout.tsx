export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      ---now playing API에 존재하지 않는 포스터는 보이지 않습니다---
      {children}
    </div>
  );
}
