import { Button } from "@/components/ui/button";
import DialogAddCategory from "@/sections/category/dialog-add-category";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useLayoutEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { toast } from "react-toastify";
import { fDate } from "@/lib/utils";

function Category() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await axiosClient.get("/category/all");
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCreateCategory = async (fData, id) => {
    try {
      if (id) {
        const res = await axiosClient.patch(`/category/update/${id}`, fData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res) {
          toast.success("Cập nhật thành công");
          fetchCategories();
        } else {
          throw new Error("Có lỗi khi cập nhật");
        }
        return;
      }
      const res = await axiosClient.post("/category/create", fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        toast.success("Thêm mới thành công");
        fetchCategories();
      } else {
        throw new Error("Có lỗi khi tạo sản phẩm");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await axiosClient.delete(`/category/delete/${id}`);
      if (res) {
        toast.success("Xóa sản phẩm thành công");
        fetchCategories();
      } else {
        throw new Error("Có lỗi khi xóa sản phẩm");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useLayoutEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-end mb-2">
        <DialogAddCategory onCreate={handleCreateCategory}>
          <Button>Thêm loại sản phẩm</Button>
        </DialogAddCategory>
      </div>
      <Table>
        <TableCaption>Danh sách danh mục</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category?._id}>
              <TableCell className="font-medium">{category?._id}</TableCell>
              <TableCell>
                <img
                  className="w-16"
                  src={category?.logo}
                  alt={category?.name}
                />
              </TableCell>
              <TableCell>{category?.name}</TableCell>
              <TableCell>{category?.description}</TableCell>
              <TableCell>{fDate(category?.createdAt)}</TableCell>
              <TableCell>
                <div className="flex gap-2 items-center justify-end">
                  {/* <Button variant="outline">Sửa</Button> */}
                  <DialogAddCategory
                    defaultValue={category}
                    onCreate={handleCreateCategory}
                  >
                    <Button variant="outline">Sửa</Button>
                  </DialogAddCategory>
                  <Button
                    onClick={() => handleDeleteCategory(category?._id)}
                    variant="destructive"
                  >
                    Xóa
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Category;
