import WebDetails from "@/components/webs/WebDetails";
const getWeb = async (id) => {
  const response = await fetch(`http://localhost:3000/web/${id}`);
  const web = await response.json();
  return web;
};

export default async function WebPages({ params }) {
  const { id } = await params;
  const web = await getWeb(id);
  return (
    <>
      <WebDetails web={web} />
    </>
  );
}
