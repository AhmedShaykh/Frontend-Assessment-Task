import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
    editName: string;
    setEditName: (val: string) => void;
    editImage: string;
    setEditImage: (val: string) => void;
    editPrice: string;
    setEditPrice: (val: string) => void;
    handleEdit: () => void;
    loading: boolean;
};

const EditProduct = ({
    open,
    setOpen,
    editName,
    setEditName,
    editImage,
    setEditImage,
    editPrice,
    setEditPrice,
    handleEdit,
    loading
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>

                    <DialogDescription>
                        Update product details below
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-3">
                    <Input
                        placeholder="Product Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <Input
                        placeholder="Image URL"
                        value={editImage}
                        onChange={(e) => setEditImage(e.target.value)}
                    />
                    <Input
                        placeholder="Price"
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                    />

                    <Button
                        className="w-full"
                        onClick={handleEdit}
                        disabled={
                            loading ||
                            !editName.trim() ||
                            !editImage.trim() ||
                            !editPrice
                        }
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditProduct;