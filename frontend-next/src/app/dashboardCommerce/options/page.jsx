"use client"
import { useCommerce } from "@/context/CommerceContext";
import CreateWeb from "@/components/DashboardCommerces/CreateWeb";
export default function DashboardCommerce() {
    const  {tokenCommerce}  = useCommerce();
    return (
        <div>
            <CreateWeb />
        </div>
    );
}