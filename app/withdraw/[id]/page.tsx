export default function page({ params }: { params: { id: string } }) {
  return <div>Withdraw Page {params.id}</div>;
}
