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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function DialogAddCategory({ children, onCreate, defaultValue }) {
  const [image, setImage] = useState(defaultValue?.logo || null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const preview = URL.createObjectURL(event.target.files[0]);
      setImage(preview);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get("image") === "") {
      formData.delete("image");
    }
    await onCreate(formData, defaultValue?._id);

    if (!defaultValue?._id) {
      event.target.reset();
      setImage(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm loại sản phẩm</DialogTitle>
            <DialogDescription className="grid gap-4 py-4">
              <Input
                defaultValue={defaultValue?.name}
                name="name"
                placeholder="Tên danh mục"
              />
              <Textarea
                defaultValue={defaultValue?.description}
                name="description"
                placeholder="Mô tả"
                rows={4}
              />
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="image">Hình ảnh</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  placeholder="Hình ảnh"
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
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {defaultValue?._id ? "Sửa" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAddCategory;
