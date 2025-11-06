export default function page({ params }: { params: { id: string } }) {
  return <div>Supply Page {params.id}</div>;
}
