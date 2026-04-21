import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    name: string;
    setName: (val: string) => void;
    image: string;
    setImage: (val: string) => void;
    price: string;
    setPrice: (val: string) => void;
    handleSubmit: () => void;
    loading: boolean;
};

const AddProduct = ({
    open,
    setOpen,
    name,
    setName,
    image,
    setImage,
    price,
    setPrice,
    handleSubmit,
    loading
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Product</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>

                    <DialogDescription>
                        Enter product details below
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-3">
                    <Input
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <Input
                        placeholder="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={loading || !name.trim() || !image.trim() || !price}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddProduct;