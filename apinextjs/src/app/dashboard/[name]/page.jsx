export default async function DashboardAdmin({params}){
    const {name} = await params
    return(
        <h1>Hello ADMIN {name}</h1>
    )
}