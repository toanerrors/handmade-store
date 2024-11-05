import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axiosClient from "@/lib/axiosClient";
import { useCallback, useLayoutEffect, useState } from "react";

function DialogAddProduct({ children, onSubmit, defaultValue }) {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(defaultValue?.image || null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const preview = URL.createObjectURL(event.target.files[0]);
      setImage(preview);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await axiosClient.get("/category/all");
      if (categories?.length) {
        setCategories(categories.map((c) => c.name));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fData = new FormData(e.target);
    await onSubmit(fData, defaultValue?._id);

    if (!defaultValue?._id) {
      e.target.reset();
      setImage(null);
    }
  };

  useLayoutEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm</DialogTitle>
            <DialogDescription>
              <div className="grid gap-4 py-4">
                <Input
                  defaultValue={defaultValue?.name}
                  name="name"
                  placeholder="Tên sản phẩm"
                />
                <Input
                  defaultValue={defaultValue?.price}
                  name="price"
                  type="number"
                  placeholder="Giá sản phẩm"
                />
                <Input
                  defaultValue={defaultValue?.stock}
                  name="stock"
                  type="number"
                  placeholder="Tồn kho"
                />
                <Select defaultValue={defaultValue?.category} name="category">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Textarea
                  defaultValue={defaultValue?.description}
                  name="description"
                  placeholder="Mô tả"
                  rows={4}
                />
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="image">Hình ảnh sản phẩm</Label>
                  <Input
                    name="image"
                    type="file"
                    placeholder="Hình ảnh sản phẩm"
                    onChange={onImageChange}
                  />

                  {image && (
                    <img
                      className="w-24 h-24 rounded-md object-cover"
                      src={image}
                      alt="Preview"
                    />
                  )}
                </div>
              </div>
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {defaultValue?._id ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAddProduct;
