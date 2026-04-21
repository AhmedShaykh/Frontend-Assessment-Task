"use client";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaginationComponent from "./PaginationComponent";
import { Input } from "@/components/ui/input";
import { BACKEND_API } from "@/lib/services";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import Products from "./Products";
import { Search } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 6;

const Main = () => {

    const [name, setName] = useState("");

    const [image, setImage] = useState("");

    const [price, setPrice] = useState("");

    const [editId, setEditId] = useState<string | null>(null);

    const [editName, setEditName] = useState("");

    const [editImage, setEditImage] = useState("");

    const [editPrice, setEditPrice] = useState("");

    const [editOpen, setEditOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const [products, setProducts] = useState<any[]>([]);

    const [search, setSearch] = useState("");

    const [sortOrder, setSortOrder] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = async () => {

        try {

            const token = Cookies.get("token");

            let url = `${BACKEND_API}/products`;

            const params = new URLSearchParams();

            if (search) params.append("search", search);

            if (sortOrder) {

                params.append("sortBy", "price");

                params.append("order", sortOrder);

            }

            if (params.toString()) url += `?${params.toString()}`;

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            setProducts(Array.isArray(data) ? data : data.products || data.data || []);

            setCurrentPage(1);

        } catch (error) {

            console.error("Fetch Error:", error);

            setProducts([]);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, [search, sortOrder]);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    const paginatedProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSubmit = async () => {

        if (!name.trim()) return toast.error("Product Name Is Required!");

        if (!image.trim()) return toast.error("Image URL Is Required!");

        if (!price || isNaN(Number(price)) || Number(price) <= 0) return toast.error("Enter A Valid Price!");

        try {

            setLoading(true);

            const token = Cookies.get("token");

            const res = await fetch(`${BACKEND_API}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name, image, price: Number(price) })
            });

            if (!res.ok) {

                const errData = await res.json().catch(() => null);

                const message = errData?.message || `Error ${res.status}: Failed To Add Product`;

                throw new Error(message);

            }

            setName("");

            setImage("");

            setPrice("");

            setOpen(false);

            fetchProducts();

            toast.success("Product Added Successfully");

        } catch (error: any) {

            console.error(error);

            toast.error(error.message || "Something Went Wrong");

        } finally {

            setLoading(false);

        }

    };

    const handleEdit = async () => {

        if (!editName.trim()) return toast.error("Product Name Is Required");

        if (!editImage.trim()) return toast.error("Image URL Is Required");

        if (!editPrice || isNaN(Number(editPrice)) || Number(editPrice) <= 0) return toast.error("Enter A Valid Price");

        try {

            setLoading(true);

            const token = Cookies.get("token");

            const res = await fetch(`${BACKEND_API}/products/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: editName,
                    image: editImage,
                    price: Number(editPrice)
                })
            });

            if (!res.ok) {

                const errData = await res.json().catch(() => null);

                const message = errData?.message || `Error ${res.status}: Failed To Update Product`;

                throw new Error(message);

            }

            setEditOpen(false);

            fetchProducts();

            toast.success("Product Updated Successfully");

        } catch (error: any) {

            console.error(error);

            toast.error(error.message || "Something Went Wrong");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id: string) => {

        try {

            const token = Cookies.get("token");

            const res = await fetch(`${BACKEND_API}/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error("Failed");

            fetchProducts();

            toast.success("Product Deleted");

        } catch (error) {

            console.error(error);

            toast.error("Something Went Wrong");

        }

    };

    const openEditDialog = (p: any) => {
        setEditId(p._id || p.id);
        setEditName(p.name);
        setEditImage(p.image);
        setEditPrice(String(p.price));
        setEditOpen(true);
    };

    return (
        <div className="p-5 space-y-5">
            <div className="max-w-[1400px] mx-auto space-y-5">
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                        <Input
                            className="pl-9"
                            placeholder="Search Product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Select value={sortOrder} onValueChange={(val) => setSortOrder(val)}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Sort By Price" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="asc">
                                    Price: Lower
                                </SelectItem>

                                <SelectItem value="desc">
                                    Price: Higher
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <AddProduct
                            open={open}
                            setOpen={setOpen}
                            name={name}
                            setName={setName}
                            image={image}
                            setImage={setImage}
                            price={price}
                            setPrice={setPrice}
                            handleSubmit={handleSubmit}
                            loading={loading}
                        />
                    </div>
                </div>

                <EditProduct
                    open={editOpen}
                    setOpen={setEditOpen}
                    editName={editName}
                    setEditName={setEditName}
                    editImage={editImage}
                    setEditImage={setEditImage}
                    editPrice={editPrice}
                    setEditPrice={setEditPrice}
                    handleEdit={handleEdit}
                    loading={loading}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Products
                        products={paginatedProducts}
                        openEditDialog={openEditDialog}
                        handleDelete={handleDelete}
                    />
                </div>

                <PaginationComponent
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    totalItems={products.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                />
            </div>
        </div>
    );
};

export default Main;