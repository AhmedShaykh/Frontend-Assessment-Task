import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

type Props = {
    products: any[];
    openEditDialog: (p: any) => void;
    handleDelete: (id: string) => void;
};

const Products = ({ products, openEditDialog, handleDelete }: Props) => {

    if (products.length === 0) {
        return (
            <div className="col-span-full flex justify-center items-center py-20">
                <h1 className="text-gray-500 text-center text-lg">
                    No Products Found
                </h1>
            </div>
        );
    }

    return (
        <>
            {products.map((p: any, i: number) => (
                <div key={i} className="border p-3 rounded">
                    <img
                        src={p.image}
                        className="w-full h-[30rem] object-cover rounded"
                        alt={p.name}
                    />

                    <h2 className="font-bold mt-2">{p.name}</h2>

                    <div className="flex justify-between items-center mt-1">
                        <p className="dark:text-gray-400 text-gray-700">
                            $ {p.price}
                        </p>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                    <MoreVertical className="w-4 h-4 text-gray-500" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => openEditDialog(p)}
                                    className="cursor-pointer gap-2"
                                >
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleDelete(p._id || p.id)}
                                    className="cursor-pointer gap-2 text-red-500 focus:text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Products;