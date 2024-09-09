export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      ---게시판 페이지에만 있는 레이아웃---
    </div>
  );
}
