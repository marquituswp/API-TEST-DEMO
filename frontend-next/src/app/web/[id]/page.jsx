import WebDetails from "@/components/webs/WebDetails";

// Funcion para obtener la web por id
const getWeb = async (id) => {
  try{
    const response = await fetch(`http://localhost:3000/web/${id}`);
    const web = await response.json();
    return web;
  }catch{
    return null;
  }
  
};

export default async function WebPages({ params }) {
  const { id } = await params; // Obtenemos el id de los parametros
  const web = await getWeb(id); // Obtenemos la web por id
  return (
    <>
      <WebDetails web={web} /> {/* Pasamos la web como prop */}
    </>
  );
}
